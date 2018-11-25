import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

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
    color: string;



  constructor(
          public navCtrl: NavController,
          public navParams: NavParams,
          public translate: TranslateService) {

      this.locationDetails = this.navParams.get('locationFeature');
      this.city = this.navParams.get("city");
      this.language = this.navParams.get("language");
      this.color = this.navParams.get("color");

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



    public getPropertyName() { // makes sure the name is returned in the correct language
      let object = this.locationDetails.properties;
        if (this.language == "English") {
            return object.name_en
        }
        return object.name
    }

    public getPropertyDescription() { // makes sure the description is returned in the correct language
      let object = this.locationDetails.properties;
        if (this.language == "English") {
            return object.description_en
        }
        return object.description
    }

}
