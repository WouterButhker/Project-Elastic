import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, Tabs} from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {MapPage} from "../map/map";

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})


export class DetailPage {
    @ViewChild('slider') slider: Slides;
    @ViewChild('baseTabs') tabRef: Tabs;
    @ViewChild('audio') audio;

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
      this.pictures = this.locationDetails.properties.picture_name;



  }



  ionViewDidLoad() {
      this.setupBackButtonBehavior();

      this.slider.autoHeight = true;
  }

  private hideAudio() {
      console.log("error loading audio file, hiding audio player");
      this.audio.nativeElement.style.display='none';
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


    private openMapPage() {
        this.navCtrl.push(MapPage, {viewSingleLocation: true, locationFeature: this.locationDetails})
        //this.navCtrl.pop();
        // TODO: fix backbutton on view on map
        //this.tabRef.select(1)
    }



    private getStaticMap() {
      // TODO: fix static maps
      let coordinates = this.locationDetails.geometry.coordinates;
      let signature = "q62hxW91A_AyMKSbAjl1NPIOj4w=";

      return "https://maps.googleapis.com/maps/api/staticmap?size=600x300&maptype=roadmap&markers=" + coordinates +
          "&key=" + this.APIKey;

    }



}
