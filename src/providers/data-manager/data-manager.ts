import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {GoogleAnalytics } from "@ionic-native/google-analytics";

@Injectable()

export class DataManagerProvider {

    public language: string;
    public city: string;
    public color: string;
    public flag: string;
    private readonly getPicturesOnline: boolean;
    private readonly getAudioOnline: boolean;
    private readonly  onlineSource: string;
    private audioBasePath: string;
    public imgBasePath: string;



    constructor(
        public http: HttpClient,
        public translate: TranslateService,
        private ga: GoogleAnalytics) {
        // settings
        this.getPicturesOnline = false;
        this.getAudioOnline = true;

        // some default values
        this.onlineSource = "http://hackersbende.nl/elastic/";
        this.audioBasePath = 'assets/Audio/';
        this.imgBasePath = 'assets/Pictures/';
        this.language = "Dutch";
        this.city = "Almelo";
        this.color = "almelo_green";
        this.flag = this.imgBasePath + "Flags/netherlands.png";

        // decide if the pictures and audio should be gotten from local source
        if (this.getPicturesOnline) {
            this.imgBasePath = this.onlineSource + this.imgBasePath;
        }

        if (this.getAudioOnline) {
            this.audioBasePath = this.onlineSource + this.audioBasePath;
        }
    }

    public async loadDataFromJson() {
        //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

        let JSON = await this.http.get('assets/Json/' + this.city + '.json').toPromise();

        return JSON['features'];
    }


    public getPicturePathByName(locationFeature, picture) {
        return this.imgBasePath + this.city + "/" +
            locationFeature.properties.picture_folder + "/" + picture;
    }

    public getPicturePathByNameAndFolder( names, folder) {
        return this.imgBasePath +
            this.city + "/" +
            folder + "/" +
            names[0]
    }

    public getPicturePath(locationFeature) {
        return this.imgBasePath +
            this.city + "/" +
            locationFeature.properties.picture_folder + "/" +
            locationFeature.properties.picture_name[0]
    }

    public getAudio(locationFeature) { // audio files should have the same name as the picture folder
        return this.audioBasePath +
            this.city + "/" +
            this.language + "/" +
            locationFeature.properties.picture_folder +
            ".mp3"
    }

    public getPropertyName(locationFeature) {
        // handle exceptions (other languages)
        if (this.language == "English") {
            return locationFeature.properties.name_en
        } else if (this.language == "German" && this.city == "Almelo") {
            return locationFeature.properties.name_de
        } else if (this.language == "Dutch" && this.city == "Nordhorn") {
            return locationFeature.properties.name_nl
        }

        // return native language
        return locationFeature.properties.name
    }

    public getPropertyShortDescription(locationFeature) {
        // handle exceptions (other languages)
        if (this.language == "English") {
            return locationFeature.properties.short_description_en
        } else if (this.language == "German" && this.city == "Almelo") {
            return locationFeature.properties.short_description_de
        } else if (this.language == "Dutch" && this.city == "Nordhorn") {
            return locationFeature.properties.short_description_nl
        }

        // return native language
        return locationFeature.properties.short_description
    }

    public getPropertyDescription(locationFeature) {
        // handle exceptions (other languages)
        if (this.language == "English") {
            return locationFeature.properties.description_en
        } else if (this.language == "German" && this.city == "Almelo") {
            return locationFeature.properties.description_de
        } else if (this.language == "Dutch" && this.city == "Nordhorn") {
            return locationFeature.properties.description_nl
        }

        // return native language
        return locationFeature.properties.description
    }

    public getCityData() {
        return [
            {
                name: "Almelo",
                viewName: "Almelo",
                image: this.imgBasePath + "Flags/netherlands.png",
                language: "Dutch",
                viewLanguage: "Nederlands"
            },
            {
                name: "Nordhorn",
                viewName: "Nordhorn",
                image: this.imgBasePath + "Flags/germany.png",
                language: "German",
                viewLanguage: "Deutsch"
            },
            {
                name: "Zelow",
                viewName: "Zelów",
                image: this.imgBasePath + "Flags/poland.png",
                language: "Polish",
                viewLanguage: "Język polski"
            },
            {
                name: "Valasske",
                viewName: "Valašské Klobouky",
                image: this.imgBasePath + "Flags/czech-republic.png",
                language: "Czech",
                viewLanguage: "Český jazyk"
            }];
    }

    private setFlag() {
        // gets the correct flag from the selected language
        for (let i = 0; i<4; i++) {
            if (this.language == this.getCityData()[i].language && this.flag != this.getCityData()[i].image) {
                this.flag = this.getCityData()[i].image;
            } else if (this.language == "English" && this.flag != (this.imgBasePath + "Flags/united-kingdom.png")) {
                this.flag = this.imgBasePath + "Flags/united-kingdom.png";
                break;
            }

        }


    }

    private checkLanguage(city) {
        // checks if the current language is possible for the new city
        // if it is not possible change to English

        // TODO: refactor?
        if (this.language != "English") {
            if (city == "Almelo" && this.language != "Dutch" && this.language != "German") {
                this.setLanuage("English");
            } else if (city == "Nordhorn" && this.language != "German" && this.language != "Dutch") {
                this.setLanuage("English");
            } else if (city == "Valasske" && this.language != "Czech"){
                this.setLanuage("English");
            } else if (city == "Zelow" && this.language != "Polish") {
                this.setLanuage("English")
            }
        }


    }



    public setLanuage(language) {
        this.translate.use(language);
        this.language = language;
        this.setFlag();

    }

    public setCity(city) {
        // change the city
        this.city = city;

        // change the navbar color
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

        // check if selected language is possible for selected city
        this.checkLanguage(city);
    }

    public gaTrackView(viewName) {
        this.ga.trackView(viewName)
    }



}
