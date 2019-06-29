import { Component, ViewChild } from '@angular/core';
import { NavController, Events, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {LanguageCitySelectorComponent} from "../../components/language-city-selector/language-city-selector";
import {TranslateService} from "@ngx-translate/core";
import {Geolocation } from "@ionic-native/geolocation";
import { ToastController } from "ionic-angular";

declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})

export class MapPage {
    map: any;
    mapCenter: object = {
        "Almelo" : {
            lat : 52.3570267,
            lng : 6.668491899999935},
        "Nordhorn" : {
            lat : 52.435920583590125,
            lng : 7.070775032043457},
        "Zelow" : {
            lat : 51.4648429739109,
            lng : 19.219454526901245},
        "Valasske" : {
            lat : 49.14050570701386,
            lng : 18.0080509185791}
    };


    @ViewChild('map') mapElement;
    @ViewChild('button') button;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private event: Events,
        public popoverCtrl: PopoverController,
        public dataManager: DataManagerProvider,
        public translate: TranslateService,
        private geolocation: Geolocation,
        private toastController: ToastController
        ) {

        this.dataManager.gaTrackView("Map");
        // check if the language or city changed
        this.event.subscribe("Language + city", () => {

            this.changeCityAndLanguage();


        })

    }

    // TODO: infowindows need margin on the right on Iphone
    // TODO: switching from menu to map doesn't center map correctly on Iphone



    ionViewDidLoad() {
        // open single location if the map gets a request from detailpage

        this.initMap();



    }

    ionViewDidEnter() {
        this.changeCityAndLanguage();

        if (this.navParams.get('viewSingleLocation')) {
            this.openLocation(this.navParams.get('locationFeature'))
        }
    }



    private initMap() {

        // SETUP VARIABLES
        // create the Map
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);

        // default styles
        const styles = [{
            "featureType": "administrative.locality",
                "stylers": [{"color": "#004080"}, {"visibility": "on"}, {"weight": 0.5}]
        }, {"featureType": "poi.school",
                "stylers": [{"visibility": "on"}]}];

        let nightMode = new google.maps.StyledMapType(
            [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#242f3e"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#746855"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#242f3e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#d59563"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#d59563"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#263c3f"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6b9a76"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#38414e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#212a37"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9ca5b3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#746855"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#1f2835"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#f3d19c"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2f3948"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#d59563"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#17263c"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#515c6d"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#17263c"
                        }
                    ]
                }
            ],
            {name: this.translate.instant("night mode")}

        );

        // map options
        const options = {
            center: Almelo,
            zoom: 14,
            mapTypeControl: true,
            fullscreenControl: false,
            clickableIcons: false,
            streetViewControl: true,
            styles: styles,
            tilt: 0,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'night_mode']
            }
        };

        const iconBike = {
            path: "M330.666 131.202c18.668 0 33.598-14.935 33.598-33.601S349.334 64 330.666 64C312 64 297.07 78.935 297.07 97.601s14.93 33.601 33.596 33.601zm56 130.132c-51.332 0-93.332 42-93.332 93.333s42 93.333 93.332 93.333C438 448 480 406 480 354.667s-42-93.333-93.334-93.333zm0 158.666c-36.402 0-65.332-28.93-65.332-65.333s28.93-65.333 65.332-65.333c36.404 0 65.334 28.93 65.334 65.333S423.07 420 386.666 420zm-81.069-196H384v-32h-58.845l-34.62-60.134c-5.605-9.333-15.869-15.864-27.07-15.864-8.399 0-16.798 3.732-22.399 9.333L169.334 194.4c-5.601 5.601-9.333 14-9.333 22.399 0 12.131 9.202 21.465 18.535 27.065L240 282.134V368h32V256l-39.333-32 42.929-44.533L305.597 224zm-180.264 37.334C74 261.334 32 303.334 32 354.667S74 448 125.333 448s93.333-42 93.333-93.333-41.999-93.333-93.333-93.333zm0 158.666C88.934 420 60 391.07 60 354.667s28.934-65.333 65.333-65.333 65.333 28.93 65.333 65.333S161.732 420 125.333 420z",
            scale: 0.08,
            fillColor: "blue",
            fillOpacity: 0.8
        };
        const iconWalk = {
            path: "M288 112c22.223 0 39.997-17.776 39.997-40 0-22.225-17.774-40-39.997-40s-40.003 17.775-40.003 40c0 22.224 17.78 40 40.003 40zM288 232h104v-40h-72l-44.802-69.333c-7.698-11.667-18.136-18.136-30.933-18.136-3.198 0-8.828.531-12.799 1.747L120 144v112h40v-80l40.531-16L120 480h40l56.698-164.271L267 384v96h38V352l-57.031-96 19.745-61.864L288 232z",
            scale: 0.07,
            fillColor: "#3fa535",
            fillOpacity: 0.9
        };

        // TODO: add ground overlay (historical maps)


        // create map and edit it
        this.map = new google.maps.Map(this.mapElement.nativeElement, options);
        const self = this; // access this from nested functions

        // make nightmode available for the user
        this.map.mapTypes.set('night_mode', nightMode);

        // support different icons for the markers
        // this.map.data.setStyle(function(feature) {
        //     return {icon: feature.getProperty('icon')};
        // });


        // support different icons
        // bicycle and walking man for Almelo
        // marker with number for Nordhorn
        // others will be default red markers
        this.map.data.setStyle(function(feature) {
            if (feature.getProperty('icon') == "cycle") {
                return {icon: iconBike}
            } else if (feature.getProperty('icon') == "walk") {
                return {icon: iconWalk}
            } else if (self.dataManager.city == "Nordhorn") {
                return {
                    icon:
                        self.dataManager.imgBasePath +
                        "Nordhorn/icon/" +
                        feature.getProperty("icon")
                };
            }
        });


        // setup button to center the map
        let ding = document.createElement('div');
        // Set CSS for the custom button to center location
        let controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.style.height = '40px';
        controlUI.style.width= '40px';
        controlUI.title = 'Click to recenter the map';
        controlUI.innerHTML = "<img src='" + this.dataManager.imgBasePath + "locate.svg" + "'>";

        ding.appendChild(controlUI);

        // push the div to google maps
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(ding);

        // add the listener for pressing on the button
        ding.addEventListener('click', function () {
            self.centerOnUser();
        });

        // create the infowindows
        let infoWindow = new google.maps.InfoWindow();


        // listens to a click on a item (e.g. marker) and display the infowindow
        this.map.data.addListener('click', function (event) {

            let name: string;
            let description: string;
            let picture = self.dataManager.getPicturePathByNameAndFolder(
                event.feature.getProperty('picture_name'),
                event.feature.getProperty('picture_folder'));

            // if English is selected as language use English names in the infowindow
            if (self.dataManager.language == "English") {
                name = event.feature.getProperty('name_en');
                description = event.feature.getProperty('short_description_en');

                // exceptions for german and dutch
            } else if (self.dataManager.city == "Almelo" && self.dataManager.language == "German") {
                name = event.feature.getProperty('name_de');
                description = event.feature.getProperty('short_description_de')
            } else if (self.dataManager.city == "Nordhorn" && self.dataManager.language == "Dutch") {
                name = event.feature.getProperty('name_nl');
                description = event.feature.getProperty('short_description_nl');

                // otherwise use native language
            } else {
                name = event.feature.getProperty('name');
                description = event.feature.getProperty('short_description');
            }

            let content = `
                <div id="infoWindowDiv">
                    <ion-item ion-item id="infoWindowButton" (click)="self.viewDetailPage()">
                        <img src=" ` + picture + `" id="infoWindowPicture" alt="">
                        <h2> ` + name + `</h2>
                        <p> ` + description + ` </p>
                    </ion-item>
                </div>
            `;

            infoWindow.setContent(content);
            infoWindow.setPosition(event.latLng);

            // show the infowindow in the correct position relative to the marker
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
            if (event.feature.getProperty('icon') == "" || null) {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
            } else if (event.feature.getProperty('icon') == "walk" || event.feature.getProperty('icon') == "cycle") {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(19, 0)})
            } else {
                // must be numbered markers in Nordhorn
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -37)})
            }

            infoWindow.open(self.map);

            // if opened from detailpage then disable the open detailpage
            if (!self.navParams.get('viewSingleLocation')) {

                // the onclick event to open the detailpage from the infowindow
                google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
                    document.getElementById('infoWindowDiv').addEventListener('click', () => {

                        self.viewDetailPage(event);
                    })
                });
            }
            // the onclick event for the infowindow


        });

    }


    private changeCityAndLanguage() {

        // load the new json file
        this.map.data.loadGeoJson('assets/Json/' + this.dataManager.city + '.json');

        console.log("-----------");
        console.log("MapPage");
        console.log("City changed to: " + this.dataManager.city);
        console.log("-----------");
        // center the map on the new city
        this.map.panTo(this.mapCenter[this.dataManager.city]);

    }

    private viewDetailPage(event) {
        // the detailpage needs the data in an object

        let locationFeature = {
            "properties": event.feature.l,
            "type" : "Feature",
            "geometry" : {
                "type" : event.feature.getGeometry().getType(),
                "coordinates" : event.latLng.toString()
                // TODO: fix coordinates
                // these are the coordinates of the click-event, not the location of the item
                // this means items such as a linestring will only output a single point
            }
        };
        console.log(locationFeature);


        // open detailpage with the correct data
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature,
            openedFromMap: true
        });


    }

    private openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageCitySelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }

    private openLocation(locationFeature) {
        // TODO: Refactor
        let location = new google.maps.LatLng(locationFeature.geometry.coordinates[1], locationFeature.geometry.coordinates[0]);
        this.map.panTo(location);

        // open the infowindow

        let infoWindow = new google.maps.InfoWindow();

        // listens to a click on a item (e.g. marker) and display the infowindow

        let name;
        let description;
        let picture = this.dataManager.getPicturePathByNameAndFolder(
            locationFeature.properties.picture_name,
            locationFeature.properties.picture_folder);

        // if English is selected as language use English names in the infowindow
        if (this.dataManager.language == "English") {
            name = locationFeature.properties.name_en;
            description = locationFeature.properties.short_description_en;

            // otherwise use the native language
        } else {
            name = locationFeature.properties.name;
            description = locationFeature.properties.short_description;
        }

        let content = `
            <div id="infoWindowDiv">
                <ion-item ion-item id="infoWindowButton" (click)="self.viewDetailPage()">
                    <img src=" ` + picture + `" id="infoWindowPicture" alt="">
                    <br clear="left">
                    <h2> ` + name + `</h2>
                    <p> ` + description + ` </p>
                </ion-item>
            </div>
        `;

        infoWindow.setContent(content);
        infoWindow.setPosition(location);

        // show the infowindow in the correct position (above markers and on lines)
        infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
        if (locationFeature.geometry.type === "Point") {
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
        }

        infoWindow.open(this.map);
    }

    private centerOnUser() {
        console.log("TEST");

        let toast = this.presentToast("Getting your location, please be patient");

        this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {
            toast.dismissAll();

            console.log("latitude: " + resp.coords.latitude);
            console.log("longitude: " + resp.coords.longitude);

            let latitude = resp.coords.latitude;
            let longitude = resp.coords.longitude;
            let userLocation = new google.maps.LatLng(latitude, longitude);

            this.map.panTo(userLocation);
            this.map.setZoom(15);

            // draw circle on user
            let userCircle = new google.maps.Circle({
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '0000FF',
                fillOpacity: 0.35,
                map: this.map,
                center: userLocation,
                radius:  resp.coords.accuracy / 2
            });


        }).catch((error) => {
            this.presentToast("Error getting your location " + error);
            console.log('error getting location ', error)
            });
    }

    private presentToast(text) {
        const toast = this.toastController.create({
            message: text,
            duration: 5000
        });
        toast.present();
        return toast;
    }

}


