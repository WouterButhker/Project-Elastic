import { Component } from '@angular/core';
import { ViewController, Events } from "ionic-angular";

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

    constructor(private event: Events, public viewCtrl: ViewController) {

        this.imgBasePath = 'assets/Pictures/Flags/';
        this.selectedLanguage = 'Dutch';
        this.selectedCity = "Almelo";

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
        this.viewCtrl.dismiss();
    }

    saveLanguage() {
        // console.log(this.selectedCity);
        // console.log(this.selectedLanguage);


        // do not allow cities to be viewed in languages they do not support
        // eg view Nordhorn in Dutch
        // this checks if the language is the native language of the city or english
        let almeloInGerman = (this.selectedCity == "Almelo" && this.selectedLanguage == "German");
        // for Almelo there is an exception because it can be viewed in both native language, English and German

        // @ts-ignore
        if (this.selectedLanguage != this.cities[this.checkCity(this.selectedCity)].language && this.selectedLanguage != "English" && !almeloInGerman) {
            console.log("Language error");

            // change the language to the native language of the city
            // this is also where the checkmark appeared for the user
            // @ts-ignore
            this.selectedLanguage = this.cities[this.checkCity(this.selectedCity)].language;
        }

        this.event.publish("Language + city", [this.selectedLanguage, this.selectedCity])




    }

    checkCity(cityName) { // get the index of this.cities by name
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
