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


        // check if the language or city has changed
        this.event.subscribe("Language + city", (languageCity) => {
            this.changeCityLanguage(languageCity.city, languageCity.language);
            this.color = languageCity.color; // changes the navbar color
            this.cityFlag = languageCity.image; // changes the flag
        })

    }



    ionViewDidLoad() {
        this.initMap();
        this.setupInfoWindows(true);

        // change the city and color to the correct value on first load of the page
        // after the first load the they will be changed by the event
        // also sets the correct json and language on first load
        this.initColorCity();


    }



    private initMap() {
        const Almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
        const options = {
            center: Almelo,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            fullscreenControl: false
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);

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

    private changeCityLanguage(city, language) { //TODO: changing city should also change language

        // load the new json file
        this.map.data.loadGeoJson('assets/Json/' + city + '.json');
        this.city = city;
        console.log("City changed to: " + city);

        // center the map on the new city
        this.map.panTo(this.mapCenter[city]);

        // TODO: changing city should change picturepath to show pictures
        this.setupInfoWindows(false);


    }

    private viewDetailPage(locationFeature) { //TODO: fix de infowindows
        //alert(loc.properties.name);
        console.log("HUH?");
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature
        });
        console.log("2")

    }

    private setupInfoWindows(firstTime) {
        let infoWindow = new google.maps.InfoWindow();

        // if the city is changed remove the old infowindow and create a new one
        if (!firstTime) {
            this.listener.remove()
        }

        let city = this.city;
        function getPicPath(folder, name) {
            return "assets/Pictures/" +
                city + "/" +
                folder + "/" +
                name
        }



        this.listener = this.map.data.addListener('click', function (event) {
            // TODO: make compatible for different languages
            let name = event.feature.getProperty('name');
            let description = event.feature.getProperty('short_description');
            let picture = getPicPath(event.feature.getProperty('picture_folder'), event.feature.getProperty('picture_name')[0]);
            let data = 0;


            let content = `
                <div id="infoWindowDiv">
                    <ion-item id="infoWindowButton">
                        <img src=" ` + picture + `" float-left id="infoWindowPicture" id="infoWindowPicture">
                        <h2> ` + name + `</h2>
                        <p> ` + description + ` </p>
                    </ion-item>
                </div>
            `;

            infoWindow.setContent(content);

            let self = this;
            infoWindow.setPosition(event.latLng);

            // bij markers de infowindow boven de marker weergeven ipv er in
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
            if (event.feature.getGeometry().getType() === "Point") {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
            }

            infoWindow.open(this.map);

            // the onclick event for the infowindow
            google.maps.event.addListenerOnce(infoWindow, 'domready', function () {
                document.getElementById('infoWindowDiv').addEventListener('click', () => {

                    // TODO: open DetailPage with arguments
                    self.viewDetailPage()

                    // loop through the locations to find the correct location feature

                })
            });

        })
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


