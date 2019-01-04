import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dataManager: DataManagerProvider) {
  }


  public start(city, language, color, country) {
      this.dataManager.city = city;
      this.dataManager.language = language;
      this.dataManager.color = color;
      this.dataManager.flag = "assets/Pictures/Flags/" + country + ".png";
      this.navCtrl.setRoot(TabsPage, {});
  }
}
