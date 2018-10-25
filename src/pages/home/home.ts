import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations : Observable<object[]>;
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


    loadDataFromJson() {
        // load the json data from a file
        let locations;

        this.http.get('/assets/Json/Almelo.json').subscribe(
            data => {
                locations = data['features'];


                console.log("succes");
                return locations;
            }, (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        );
        console.log("nope");
        return locations;
    }


}
