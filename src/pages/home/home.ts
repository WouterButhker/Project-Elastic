import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Events, NavController, NavParams, PopoverController, ToastController} from "ionic-angular";
import {DetailPage} from "../detail/detail";
import {LanguageSelectorComponent} from "../../components/language-selector/language-selector";
import {TranslateService} from "@ngx-translate/core";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

// TODO: Add introduction page

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
        private navParams: NavParams

        ) {

        console.log("NAVPARAMS: " + this.navParams.get("language"));
            this.currentLanguage = this.navParams.get("language"); // sets Dutch as default language
            this.currentCity = this.navParams.get("city"); // sets Almelo as default city
            this.color = this.navParams.get("color");
            // TODO: fix Almelo.json
            this.currentCountryImage = this.navParams.get("image");

            this.locations = this.loadDataFromJson(this.currentCity);
            this.categories = ["factory", "factory owner's home", "other"];


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


    getPicturePath(locationFeature) {
        return "assets/Pictures/" + this.currentCity + "/" +
            locationFeature.properties.picture_folder + "/" +
            locationFeature.properties.picture_name[0];
    }

    getPropertyName(object) {
        if (this.currentLanguage == "English") {
            return object.name_en
        }
        return object.name
    }

    getPropertyShortDescription(object) {
        if (this.currentLanguage == "English") {
            return object.short_description_en
        }
        return object.short_description
    }

    async loadDataFromJson(city) { //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

        let JSON = await this.http.get('assets/Json/' + city + '.json').toPromise();

        return JSON['features'];

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
            this.locations = this.loadDataFromJson(city);
            console.log("data changed to " + city);
            this.currentCity = city;

            // change the icon in the navbar to the correct country
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
