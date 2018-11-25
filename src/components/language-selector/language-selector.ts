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

    selectedCity: string = "Almelo";
    selectedLanguage: string = 'Dutch';
    cities: object[];
    imgBasePath: string;

    constructor(private event: Events, public viewCtrl: ViewController) {

        this.imgBasePath = 'assets/Pictures/Flags/';


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
        // do not allow cities to be viewed in languages they do not support
        // eg view Nordhorn in Dutch
        // this checks if the language is the native language of the city or english
        let almeloInGerman = (this.selectedCity == "Almelo" && this.selectedLanguage == "German");
        // for Almelo there is an exception because it can be viewed in both native language, English and German

        // @ts-ignore
        if (this.selectedLanguage != this.getCityByName(this.selectedCity).language && this.selectedLanguage != "English" && !almeloInGerman) {
            console.log("Language error");

            // FIXME there should be a better way to do this
            // change the language to the native language of the city
            // this is also where the checkmark appeared for the user
            // @ts-ignore
            this.selectedLanguage = this.getCityByName(this.selectedCity).language;
        }

        // pass the language and city on to the homePage
        // @ts-ignore
        let img = this.getCityByName(this.selectedCity).image;
        this.event.publish(
            "Language + city",
            {
                "language" : this.selectedLanguage,
                "city" : this.selectedCity,
                "image" : img,
                "color" : this.getNavBarColor()
            });

        // close the view after everything is done
        this.viewCtrl.dismiss();

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
}
