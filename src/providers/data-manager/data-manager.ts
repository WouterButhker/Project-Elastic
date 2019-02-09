import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class DataManagerProvider {
    public language: string = "Dutch";
    public city: string = "Almelo";
    public color: string = "almelo_green";
    public flag: string = "assets/Pictures/Flags/netherlands.png";
    public imgBasePath: string = 'assets/Pictures/Flags/';


    constructor(
        public http: HttpClient, public translate: TranslateService) {
    }

    public async loadDataFromJson() {
        //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

        let JSON = await this.http.get('assets/Json/' + this.city + '.json').toPromise();

        return JSON['features'];
    }


    public getPicturePathByName(locationFeature, picture) {
        return "assets/Pictures/" + this.city + "/" +
            locationFeature.properties.picture_folder + "/" + picture;
    }

    public getPicturePathByNameAndFolder( names, folder) {
        return "assets/Pictures/" +
            this.city + "/" +
            folder + "/" +
            names[0]
    }

    public getPicturePath(locationFeature) {
        return "assets/Pictures/" +
            this.city + "/" +
            locationFeature.properties.picture_folder + "/" +
            locationFeature.properties.picture_name[0]
    }

    public getPropertyName(locationFeature) {
        if (this.language == "English") {
            return locationFeature.properties.name_en
        }
        return locationFeature.properties.name
    }

    public getPropertyShortDescription(locationFeature) {
        if (this.language == "English") {
            return locationFeature.properties.short_description_en
        }
        return locationFeature.properties.short_description
    }

    public getPropertyDescription(locationFeature) {
        if (this.language == "English") {
            return locationFeature.properties.description_en
        }
        return locationFeature.properties.description
    }

    public getCityData() {
        return [
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

    private setFlag() {
        // gets the correct flag from the selected language
        for (let i = 0; i<4; i++) {
            if (this.language == this.getCityData()[i].language && this.flag != this.getCityData()[i].image) {
                this.flag = this.getCityData()[i].image;
            } else if (this.language == "English" && this.flag != "assets/Pictures/Flags/united-kingdom.png") {
                this.flag = "assets/Pictures/Flags/united-kingdom.png";
                break;
            }

        }


    }

    public setLanuage(language) {
        this.translate.use(language);
        this.language = language;
        this.setFlag();

    }

    public setCity(city) {
        this.city = city;

        switch (city) {
            case 'Almelo' :
                this.color = 'almelo_green';
                break;
            case 'Nordhorn':
                this.color = 'primary';
                break;
            case 'Zelow' :
                this.color = 'almelo_pink';
                break;
            case 'Valasske' :
                this.color = 'almelo_orange';
                break;
        }
    }



}
