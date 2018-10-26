import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations;
    testArray : number[];
    testString : string;
    testObj : object[];
    constructor(private http: HttpClient) {
        this.testString = "test";
        this.locations = this.loadDataFromJson();
        this.testArray = [1,2,3,4];
        this.testObj = [
            {
                "properties": {
                    "name" : "fail"
                }
            },
            {
                "properties" : {
                    "name" : "fail"
                }
            }
        ];
    }


    ionViewDidLoad() {

        //
    }


    async loadDataFromJson() {
        // load the json data from a file
        // let locations;
        //
        // this.http.get('/assets/Json/Almelo.json').subscribe(
        //     data => {
        //         locations = data['features'];
        //
        //
        //         console.log("succes");
        //
        //     }, (err: HttpErrorResponse) => {
        //         console.log(err.message);
        //     }
        // );
        // console.log("nope");
        // return locations;


        return await this.resolveThing();
    }

    resolveThing() {
        return new Promise(resolve => {

            this.http.get('/assets/Json/Almelo.json').subscribe(
                data => {
                    let locations = data['features'];

                    resolve(locations);
                    console.log("succes");

                }, (err: HttpErrorResponse) => {
                    console.log(err.message);
                }
            );

        });
    }


}
