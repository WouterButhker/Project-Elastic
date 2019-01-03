import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',

})


export class DetailPage {
    @ViewChild('slider') slider: Slides;

    locationDetails;
    city: string;
    language: string;
    color: string;
    pictures: string[];
    private APIKey: string = "AIzaSyCXopP8dS5mRg9il5qfZO_qI3L6TxObF4c"; // TODO: get apiKey from file


  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          public translate: TranslateService,
          public dataManager: DataManagerProvider) {

      this.locationDetails = this.navParams.get('locationFeature');
      this.city = this.navParams.get("city");
      this.language = this.navParams.get("language");
      this.color = this.navParams.get("color");
      this.pictures = this.locationDetails.properties.picture_name;



  }



  ionViewDidLoad() {
      this.setupBackButtonBehavior();

      this.slider.autoHeight = true;
  }



    private setupBackButtonBehavior () {

        // If on web version (browser)
        if (window.location.protocol !== "file:") {

            // Register browser back button action(s)
            window.onpopstate = (evt) => {

                // Go back to rootPage is there is one
                if (this.navCtrl.canGoBack()) {
                    this.navCtrl.pop();
                }
            };
        }
    }






    public getStaticMap() {
      // TODO: fix static maps
      let coordinates = this.locationDetails.geometry.coordinates;
      let signature = "q62hxW91A_AyMKSbAjl1NPIOj4w=";

      return "https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=" + coordinates +
          "&key=" + this.APIKey;

    }



}
