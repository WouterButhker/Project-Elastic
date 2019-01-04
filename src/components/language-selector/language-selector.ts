import { Component } from '@angular/core';
import { ViewController, Events } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";

/**
 * Generated class for the LanguageSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'language-selector',
    templateUrl: 'language-selector.html'
})
export class LanguageSelectorComponent {

    selectedCity: string;
    selectedLanguage: string; // TODO: fix selected language not displaying correctly
    cities: object[];
    imgBasePath: string = 'assets/Pictures/Flags/';

    constructor(private event: Events,
                public viewCtrl: ViewController,
                public translate: TranslateService,
                public dataManager: DataManagerProvider) {



        this.selectedCity = this.dataManager.city;
        this.selectedLanguage = this.dataManager.language;



        this.cities = [
            {
                name: "Almelo",
                viewName: "Almelo",
                image: this.imgBasePath + "netherlands.png",
                language: "Dutch",
                viewLanguage: "Nederlands"
            },
            {
                name: "Nordhorn",
                viewName: "Nordhorn",
                image: this.imgBasePath + "germany.png",
                language: "German",
                viewLanguage: "Deutsch"
            },
            {
                name: "Zelow",
                viewName: "Zelów",
                image: this.imgBasePath + "poland.png",
                language: "Polish",
                viewLanguage: "Język polski"
            },
            {
                name: "Valasske",
                viewName: "Valašské Klobouky",
                image: this.imgBasePath + "czech-republic.png",
                language: "Czech",
                viewLanguage: "Český jazyk"
            }];

    }

    cancelLanguage() {
        this.translate.use(this.dataManager.language); // revert to original language
        this.viewCtrl.dismiss();
    }

    // gets executed when user clicks save
    saveLanguage() {

        console.log("---------------");
        console.log("Language Selector component");
        console.log("Changed Language to: " + this.selectedLanguage);
        console.log("Changed city to: " + this.selectedCity);
        console.log("Changed navBarColor to: " + this.getNavBarColor());
        console.log("Changed Flag to: " + this.getCityByLanguage(this.selectedLanguage)['image']);
        console.log("---------------");
        this.dataManager.language = this.selectedLanguage;
        this.dataManager.city = this.selectedCity;
        this.dataManager.color = this.getNavBarColor();
        this.dataManager.flag = this.getCityByLanguage(this.selectedLanguage)['image'];


        this.event.publish("Language + city");

        this.viewCtrl.dismiss()
    }

    getCityByName(cityName) { // get the city of this.cities by name
        if (cityName == "Almelo") {
            return this.cities[0];
        } else if (cityName == "Nordhorn") {
            return this.cities[1];
        } else if (cityName == "Zelow") {
            return this.cities[2];
        } else if (cityName == "Valasske") {
            return this.cities[3];
        }
    }

    getCityByLanguage(language) { // get the city of this.cities by name
        if (language == "Dutch") {
            return this.cities[0];
        } else if (language == "German") {
            return this.cities[1];
        } else if (language == "Polish") {
            return this.cities[2];
        } else if (language == "Czech") {
            return this.cities[3];
        } else {
            return {image: this.imgBasePath + "united-kingdom.png"}
        }
    }

    getNavBarColor() {
        // change navbar color
        if (this.selectedCity == "Almelo") {
            return "almelo_green";
        } else if (this.selectedCity == "Nordhorn") {
            return "primary";
        } else if (this.selectedCity == "Zelow") {
            return "almelo_pink";
        } else if (this.selectedCity == "Valasske") {
            return "almelo_orange"
        }
    }

    changeButtonLang() {
        this.translate.use(this.selectedLanguage);
        console.log("LANGUAGE CHANGED")
    }
}
