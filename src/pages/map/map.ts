import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Events, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {LanguageSelectorComponent} from "../../components/language-selector/language-selector";

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
        this.initMap();
        this.changeCityAndLanguage();

        // change the city and color to the correct value on first load of the page
        // after the first load the they will be changed by the event
        // also sets the correct json and language on first load


    }



    private initMap() {
        // create the Map
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
        const options = {
            center: Almelo,
            zoom: 14,
            mapTypeControl: true,
            fullscreenControl: false
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);


        //

        // create the infowindows
        let infoWindow = new google.maps.InfoWindow();
        const self = this; // access this from nested functions

        // listens to a click on a item (e.g. marker) and display the infowindow
        this.map.data.addListener('click', function (event) {

            let name;
            let description;
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
                    <button ion-item id="infoWindowButton" (click)="self.viewDetailPage()">
                        <img src=" ` + picture + `" id="infoWindowPicture" alt="">
                        <br clear="left">
                        <h2> ` + name + `</h2>
                        <p> ` + description + ` </p>
                    </button>
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
            LanguageSelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }

}


