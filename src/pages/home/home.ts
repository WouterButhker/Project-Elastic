import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from "ionic-angular";
import { DetailPage } from "../detail/detail";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations; //variable that holds the list of locations and their features

    constructor(private http: HttpClient, public navCtrl: NavController) {

        this.locations = this.loadDataFromJson();

    }


    async loadDataFromJson() { //gets the json from a local file and returns it when ready
        //https://medium.com/@balramchavan/using-async-await-feature-in-angular-587dd56fdc77
        //TODO: add support for different Json files

        let locationsDing = await this.http.get('/assets/Json/ALmelo.json').toPromise();
        return locationsDing['features'];

    }

    public viewDetailPage(locationFeature) {
        //alert(locationFeature.properties.name);
        this.navCtrl.push(DetailPage, {
            locationFeature: locationFeature
        })

    }



}
