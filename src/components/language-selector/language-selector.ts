import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";


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

    selectedLanguage: string;
    cities: object[];
    imgBasePath: string;

    constructor(public viewCtrl: ViewController) {

        this.imgBasePath = 'assets/Pictures/Flags/';
        this.selectedLanguage = 'Dutch';

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

        this.selectedCity = "Almelo";
    }

    cancelLanguage() {
        this.viewCtrl.dismiss();
    }

    saveLanguage() {
        console.log(this.selectedCity);
        console.log(this.selectedLanguage);

    }

    checkCity(cityName) {
        if (cityName == "Almelo") {
            return 0;
        } else if (cityName == "Nordhorn") {
            return 1;
        } else if (cityName == "Zelow") {
            return 2;
        } else if (cityName == "Valasske") {
            return 3;
        }
    }
}
