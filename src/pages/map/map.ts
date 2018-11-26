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
    city: string = 'Almelo';
    language: string = "Dutch";
    public color: string = "almelo_green";
    public cityFlag: string = "assets/Pictures/Flags/netherlands.png";

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
        this.initColorCity();

    }


    initMap() {
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935); // TODO: change center for different locations
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

        // loadData($) {
        //   $.getJSON('Test.geojson', function (eventsData) {
        //     var eventsSize = Object.size(eventsData);
        //     console.log(eventsSize);
        //   })
        // }

    }

    public viewDetailPage(locationFeature) { //TODO: fix de infowindows
        //alert(loc.properties.name);
        console.log("HUH?");
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature
        });
        console.log("2")

    }


    public changeCityLanguage(city, language) { //TODO: changing city should also possibly change language

        // don't change the city and language if they are already selected
        if (city == this.city && this.language == language) {
            return;
        }


        this.map.data.loadGeoJson('assets/Json/' + city + '.json');
        this.city = city;
        console.log("City changed to: " + city);


    }

    public initColorCity() {
        // change city and language
        if (this.city != this.navParams.get("city") && this.navParams.get("city") != undefined) {
            this.changeCityLanguage(this.navParams.get("city"), this.navParams.get("language"))
        }

        // change color
        if (this.color != this.navParams.get("color") && this.navParams.get("color") != undefined) {
            this.color = this.navParams.get("color");
        }

        // change city flag
        if (this.cityFlag != this.navParams.get("image") && this.navParams.get("image") != undefined) {
            this.cityFlag = this.navParams.get("image");
            console.log("FLAG CHANGED TO" + this.cityFlag)
        }
    }



    openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageSelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }


}


