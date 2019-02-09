import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Events, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {LanguageCitySelectorComponent} from "../../components/language-city-selector/language-city-selector";

declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})

export class MapPage {
    map: any;
    public listener;
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

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        private event: Events,
        public popoverCtrl: PopoverController,
        public dataManager: DataManagerProvider) {


        // check if the language or city changed
        this.event.subscribe("Language + city", () => {

            this.changeCityAndLanguage();


        })

    }



    ionViewDidLoad() {
        // open single location if the map gets a request from detailpage

        this.initMap();
        this.changeCityAndLanguage();

        if (this.navParams.get('viewSingleLocation')) {
            this.openLocation(this.navParams.get('locationFeature'))
        }

    }



    private initMap() {
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
            {name: 'Night Mode'}
        );

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
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'night_mode']
            }
        };

        // TODO: add ground overlay (old maps)


        this.map = new google.maps.Map(this.mapElement.nativeElement, options);


        // make nightmode available for the user
        this.map.mapTypes.set('night_mode', nightMode);


        // create the infowindows
        let infoWindow = new google.maps.InfoWindow();
        const self = this; // access this from nested functions

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

            // otherwise use the native language
            } else {
                name = event.feature.getProperty('name');
                description = event.feature.getProperty('short_description');
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
            infoWindow.setPosition(event.latLng);

            // show the infowindow in the correct position (above markers and on lines)
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
            if (event.feature.getGeometry().getType() === "Point") {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
            }

            infoWindow.open(self.map);

            // the onclick event for the infowindow
            google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
                document.getElementById('infoWindowDiv').addEventListener('click', () => {

                    self.viewDetailPage(event);


                })
            });

        })

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

}


