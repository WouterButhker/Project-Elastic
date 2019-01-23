import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {TranslateService} from "@ngx-translate/core";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {LanguageCitySelectorComponent} from "../../components/language-city-selector/language-city-selector";
import {LanguageSelectorComponent} from "../../components/language-selector/language-selector";

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
              private dataManager: DataManagerProvider,
              private translate: TranslateService,
              private popoverCtrl: PopoverController) {

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
          this.translate.use("English");
          this.dataManager.language = "English";
      } else if (navigator.language.startsWith("nl")) {
          this.translate.use("Dutch");
          this.dataManager.language = "Dutch";
      } else if (navigator.language.startsWith("pl")) {
          this.translate.use("Polish");
          this.dataManager.language = "Polish";
      } else if (navigator.language.startsWith("cs")) {
         this.translate.use("Czech");
         this.dataManager.language = "Czech";
      } else {
          this.translate.use("English");
          this.dataManager.language = "English";
      }
      this.dataManager.setFlag();
  }

    private openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageSelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }
}
