import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private http: HttpClient) {

        this.http.get('/assets/Json/Almelo.json').subscribe(
            data => {
                console.log(data);
            }, (err: HttpErrorResponse) => {
                console.log(err.message);
            }
        )
      // load the data and print it in the console
      // this.getJSON().subscribe(data => {
      //     console.log(data)
      // });


  }

  // public getJSON(): Observable<any> {
  //     return this.http.get("assets/Json/Almelo.json"); //TODO: add compatibility for other places
  // }

    ionViewDidLoad() {
        this.loadDataFromJson();
    }


    loadDataFromJson() {

    }

}
