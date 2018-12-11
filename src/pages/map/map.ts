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
    city: string = "Almelo";
    language: string = "Dutch";
    public color: string = "almelo_green";
    public cityFlag: string = "assets/Pictures/Flags/netherlands.png";
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


        // check if the language or city has changed
        this.event.subscribe("Language + city", (languageCity) => {
            this.changeCityLanguage(languageCity.city, languageCity.language);
            this.color = languageCity.color; // changes the navbar color
            this.cityFlag = languageCity.image; // changes the flag
        })

    }



    ionViewDidLoad() {
        this.initMap();


        // change the city and color to the correct value on first load of the page
        // after the first load the they will be changed by the event
        // also sets the correct json and language on first load
        this.initColorCity();


    }


    initMap() {
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
        const options = {
            center: Almelo,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            fullscreenControl: false
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);



        var infoWindow = new google.maps.InfoWindow();



        this.map.data.addListener('click', function (event) {
            let name = event.feature.getProperty('name');
            let time = event.feature.getProperty('time');
            let picture = event.feature.getProperty('picture');


            let content =
                '<button id="infowindow" (click)=""> ' +
                    '<div id="thumbnail">' +
                        '<img id="thumbnailPicture" src=" ' + picture + ' "> ' +
                    '</div> ' +

                    '<div id="content"> ' +
                        '<h2>' + name + '</h2>' +
                        ' <p id="time"> ' + time + '</p> ' +
                    '</div> ' +
                '</button>';

            infoWindow.setContent(content);

            // only show picture and time when there actually is a picture
            // if(picture === "") {
            //     document.getElementById('thumbnail').style.display = 'none';
            // }
            // if (time === undefined) {
            //     document.getElementById('time').style.display = 'none';
            // }

            infoWindow.setPosition(event.latLng);

            // bij markers de infowindow boven de marker weergeven ipv er in
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
            if (event.feature.getGeometry().getType() === "Point") {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
            }

            infoWindow.open(this.map);

            })

    }

    public initColorCity() {
        // gets the values passed from the home screen on first load of the page
        // these values will return undefined if the user never changed the language
        let initialCity = this.navParams.get("city");
        let initialLanguage = this.navParams.get("language");
        let initialFlag = this.navParams.get("image");
        let initialColor = this.navParams.get("color");


        // load the correct json and language
        // if the user hasn't changed the city or language yet load the default values
        if (initialCity == undefined && initialLanguage == undefined) {
            this.changeCityLanguage(this.city, this.language)
        } else if (this.city != initialCity && initialCity != undefined) {
            this.changeCityLanguage(initialCity, initialLanguage)
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

    public changeCityLanguage(city, language) { //TODO: changing city should also change language

        // load the new json file
        this.map.data.loadGeoJson('assets/Json/' + city + '.json');
        this.city = city;
        console.log("City changed to: " + city);

        // center the map on the new city
        this.map.panTo(this.mapCenter[city]);

    }

    public viewDetailPage(locationFeature) { //TODO: fix de infowindows
        //alert(loc.properties.name);
        console.log("HUH?");
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature
        });
        console.log("2")

    }








    openLanguageSelector(myEvent) {
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


