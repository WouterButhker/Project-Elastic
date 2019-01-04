import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {TranslateService} from "@ngx-translate/core";
import {el} from "@angular/platform-browser/testing/src/browser_util";

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
              private dataManager: DataManagerProvider,
              private translate: TranslateService) {

      this.checkUserLanguage();
  }


  public start(city, language, color, country) {
      this.dataManager.city = city;
      this.dataManager.language = language;
      this.translate.use(language);
      this.dataManager.color = color;
      this.dataManager.flag = "assets/Pictures/Flags/" + country + ".png";
      this.navCtrl.setRoot(TabsPage, {});
  }

  private checkUserLanguage() {
      this.translate.setDefaultLang("Dutch"); // sets default language to Dutch
      if (navigator.language.startsWith("en")) {
          this.translate.use("English")
      } else if (navigator.language.startsWith("nl")) {
          this.translate.use("Dutch")
      } else if (navigator.language.startsWith("pl")) {
          this.translate.use("Polish")
      } else if (navigator.language.startsWith("cs")) {
         this.translate.use("Czech")
      } else {
          this.translate.use("English");
      }
  }
}
