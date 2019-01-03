import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the DataManagerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataManagerProvider {


    constructor(public http: HttpClient) {
        console.log('Hello DataManagerProvider Provider');
    }

    public async loadDataFromJson(city) { //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77

        let JSON = await this.http.get('assets/Json/' + city + '.json').toPromise();

        return JSON['features'];
    }


    public getPicturePathByCity(locationFeature, city) {
        return "assets/Pictures/" + city + "/" +
            locationFeature.properties.picture_folder + "/" +
            locationFeature.properties.picture_name[0];
    }

    public getPicturePathByName(locationFeature, city, picture) {
        return "assets/Pictures/" + city + "/" +
            locationFeature.properties.picture_folder + "/" + picture;
    }

    public getPicturePathByNameAndFolder(city, names, folder) {
        return "assets/Pictures/" +
            city + "/" +
            folder + "/" +
            names[0]
    }

    public getPropertyName(locationFeature, language) {
        if (language == "English") {
            return locationFeature.properties.name_en
        }
        console.log(locationFeature);
        return locationFeature.properties.name
    }

    public getPropertyShortDescription(locationFeature, language) {
        if (language == "English") {
            return locationFeature.properties.short_description_en
        }
        return locationFeature.properties.short_description
    }

    public getPropertyDescription(locationFeature, language) { // makes sure the description is returned in the correct language
        let object = locationFeature.properties;
        if (language == "English") {
            return object.description_en
        }
        return object.description
    }
}
