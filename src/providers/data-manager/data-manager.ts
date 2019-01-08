import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class DataManagerProvider {
    public language: string = "Dutch";
    public city: string = "Almelo";
    public color: string = "almelo_green";
    public flag: string = "assets/Pictures/Flags/netherlands.png";


    constructor(
        public http: HttpClient) {
        console.log('Hello DataManagerProvider Provider');
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



}
