import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',

})
export class DetailPage {

    locationDetails;
    city: string;
    picturePath: string;
    language: string;


  constructor(
          public navCtrl: NavController,
          public navParams: NavParams) {

      this.locationDetails = this.navParams.get('locationFeature');
      this.city = this.navParams.get("city");
      // TODO: add support for different languages in DetailPage
      this.language = this.navParams.get("language");

      // TODO: add support for multiple pictures
      // set the path for the
      this.picturePath = "assets/Pictures/" + this.city + "/" + this.locationDetails.properties.picture_folder + "/" + this.locationDetails.properties.picture_name[0]

  }



  ionViewDidLoad() {
      this.setupBackButtonBehavior();
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



}
