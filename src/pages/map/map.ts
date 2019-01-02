import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, Events, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from "../detail/detail";
import { LanguageSelectorComponent } from "../../components/language-selector/language-selector";

declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})

export class MapPage {
    map: any;
    public city: string = "Almelo";
    language: string = "Dutch";
    public color: string = "almelo_green";
    public cityFlag: string = "assets/Pictures/Flags/netherlands.png";
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
        public popoverCtrl: PopoverController) {


        // check if the language or city changed
        this.event.subscribe("Language + city", (languageCity) => {

            let language = languageCity.language;
            let city = languageCity.city;
            this.changeCityAndLanguage(city, language);

            // changes navbar color
            this.color = languageCity.color;

        })

    }



    ionViewDidLoad() {
        this.initMap();

        // change the city and color to the correct value on first load of the page
        // after the first load the they will be changed by the event
        // also sets the correct json and language on first load
        this.initColorCity();


    }



    private initMap() {
        // create the Map
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
        const options = {
            center: Almelo,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            fullscreenControl: false
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);



        // create the infowindows
        let infoWindow = new google.maps.InfoWindow();
        const self = this; // access this from nested functions

        // listens to a click on a item (e.g. marker) and display the infowindow
        this.map.data.addListener('click', function (event) {
            // TODO: make compatible for different languages

            let name;
            let description;
            let picture = self.getPicPath(event.feature.getProperty('picture_folder'), event.feature.getProperty('picture_name')[0]);


            // if English is selected as language use English names in the infowindow
            if (self.language == "English") {
                name = event.feature.getProperty('name_en');
                description = event.feature.getProperty('short_description_en');

            // otherwise use the native language
            } else {
                name = event.feature.getProperty('name');
                description = event.feature.getProperty('short_description');
            }

            let content = `
                <div id="infoWindowDiv">
                    <ion-item id="infoWindowButton" (click)="self.viewDetailPage()">
                        <img src=" ` + picture + `" id="infoWindowPicture">
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

                    self.viewDetailPage(event.feature);


                })
            });

        })

    }

    private getPicPath(folder, name) {
        return "assets/Pictures/" +
            this.city + "/" +
            folder + "/" +
            name
    }



    private initColorCity() {
        // gets the values passed from the home screen on first load of the page
        // these values will return undefined if the user never changed the language
        let initialCity = this.navParams.get("city");
        let initialLanguage = this.navParams.get("language");
        let initialFlag = this.navParams.get("image");
        let initialColor = this.navParams.get("color");


        // load the correct json and language
        // if the user hasn't changed the city or language yet load the default values
        if (initialCity == undefined && initialLanguage == undefined) {
            this.changeCityAndLanguage(this.city, this.language)
        } else if (this.city != initialCity && initialCity != undefined) {
            this.changeCityAndLanguage(initialCity, initialLanguage)
        }

        // change color
        if (this.color != initialColor && initialColor != undefined) {
            this.color = initialColor;
        }

        // change city flag
        if (this.cityFlag != initialFlag && initialFlag != undefined) {
            this.cityFlag = initialFlag;
        }


    }

    private changeCityAndLanguage(city, language) { //TODO: changing city should also change language

        // load the new json file
        this.map.data.loadGeoJson('assets/Json/' + city + '.json');
        this.city = city;
        console.log("City changed to: " + city);

        // center the map on the new city
        this.map.panTo(this.mapCenter[city]);

        // change language
        console.log("language changed to " + language);
        this.language = language;



    }

    private viewDetailPage(locFeat) { //TODO: fix de infowindows
        //alert(loc.properties.name);


        // the detailpage needs the data in an array

        let locationFeature = {
            "properties": locFeat.l,
            "type" : "Feature",
            "geometry" : {
                "type" : locFeat.getGeometry().getType()
               // TODO: add the correct coordinates
                // event.latlng
            }
        };


        // open detailpage with the correct data
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature,
            city: this.city,
            language: this.language,
            color: this.color
        });


    }


    private openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageSelectorComponent,
            // pass the current city and language so the user will see the correct radio buttons selected
            {'city': this.city, 'language': this.language},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }


}


