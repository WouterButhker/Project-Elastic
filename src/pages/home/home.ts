import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Events, NavController, NavParams, PopoverController, ToastController} from "ionic-angular";
import {DetailPage} from "../detail/detail";
import {LanguageSelectorComponent} from "../../components/language-selector/language-selector";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations: object;
    categories; // TODO: categories
    currentLanguage: string;
    currentCity: string;
    currentCountryImage: string;
    color: string;

    constructor(
        private http: HttpClient,
        private popoverCtrl: PopoverController,
        private navCtrl: NavController,
        private toastCtrl: ToastController,
        private event: Events,
        private navParams: NavParams,
        public dataManager: DataManagerProvider

        ) {


            this.currentLanguage = this.navParams.get("language"); // sets Dutch as default language
            this.currentCity = this.navParams.get("city"); // sets Almelo as default city
            this.color = this.navParams.get("color");
            this.currentCountryImage = this.navParams.get("image");

            this.locations = this.dataManager.loadDataFromJson(this.currentCity);

            // this.categories = ["factory", "factory owner's home", "other"];


            // check if the language or city changed
            this.event.subscribe("Language + city", (languageCity) => {

                let language = languageCity.language;
                let city = languageCity.city;
                let img = languageCity.image;
                this.changeCityAndLanguage(city, language, img);

                // changes navbar color
                this.color = languageCity.color;

            })


    }



    viewDetailPage(locationFeature) {
        //alert(loc.properties.name);
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature,
            city: this.currentCity,
            language: this.currentLanguage,
            color: this.color
        })

    }



    openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageSelectorComponent,

            // pass the current city and language so the user will see the correct radio buttons selected
            {'language': this.currentLanguage, 'city': this.currentCity},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }

    changeCityAndLanguage(city, language, img) {
        // change city
        // only update the list if the city actually changed
        if (this.currentCity != city) {
            this.locations = this.dataManager.loadDataFromJson(city);
            console.log("data changed to " + city);
            this.currentCity = city;

            // change the icon in the navbar to the correct country
            // TODO: Switch to language flag instead of country flag
            this.currentCountryImage = img;
        }

        // change language
        // only update the language if the language actually changed
        if (this.currentLanguage != language && language != '') {

            // this.translate.use(language);

            console.log("language changed to " + language);
            this.currentLanguage = language;


        }





    }





}
