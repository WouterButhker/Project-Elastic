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

  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          public translate: TranslateService,
          public dataManager: DataManagerProvider) {

      this.locationDetails = this.navParams.get('locationFeature');
      this.pictures = this.locationDetails.properties.picture_name;

  }

  // TODO: on Iphone the audio bar gets displayed even though there is no audio
    // TODO: add auto audio
    // TODO: add static maps


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
        //this.tabRef.select(1)
    }






}
