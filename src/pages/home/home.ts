import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController, ToastController, PopoverController, Events } from "ionic-angular";
import { DetailPage } from "../detail/detail";
import { LanguageSelectorComponent } from "../../components/language-selector/language-selector";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations; //variable that holds the list of locations and their features
    categories;
    currentLanguage: string;
    currentCity: string;
    currentCountryImage: string;

    constructor(
        private http: HttpClient,
        public popoverCtrl: PopoverController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        private event: Events) {

            this.currentLanguage = "Dutch"; // sets Dutch as default language
            this.currentCity = "Almelo"; // sets Almelo as default city
            this.currentCountryImage = "assets/Pictures/Flags/netherlands.png";

            this.locations = this.loadDataFromJson(this.currentCity);
            this.categories = ["factory", "factory owner's home", "other"];


            // check if the language or city changed
            this.event.subscribe("Language + city", (languageCity) => {
                let language = languageCity[0];
                let city = languageCity[1];
                let img = languageCity[2];
                this.changeCityAndLanguage(city, language, img);
            })

    }


    async loadDataFromJson(city) { //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

        let locationsDing = await this.http.get('assets/Json/' + city + '.json').toPromise();
        return locationsDing['features'];

    }

    public viewDetailPage(locationFeature) {
        //alert(locationFeature.properties.name);
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature
        })

    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: 'Dat werkt nog niet helemaal!',
            duration: 3000
        });

        toast.present();

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

    public changeCityAndLanguage(city, language, img) {
        // only update the list if the city actually changed
        if (this.currentCity != city) {
            this.locations = this.loadDataFromJson(city);
            console.log("data changed to " + city);
            this.currentCity = city;
        }

        // only update the language if the language actually changed
        if (this.currentLanguage != language && language != '') {
            // TODO: change the language

            console.log("language changed to " + language);
            this.currentLanguage = language;
        }

        // change the icon in the navbar to the correct country
        this.currentCountryImage = img;

    }





}
