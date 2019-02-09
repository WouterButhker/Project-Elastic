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


  public start(city) {
      this.dataManager.setCity(city);
      this.navCtrl.setRoot(TabsPage, {});
  }

  private checkUserLanguage() {
      this.translate.setDefaultLang("English"); // sets default language to English
      if (navigator.language.startsWith("en")) {
          this.dataManager.setLanuage("English");
      } else if (navigator.language.startsWith("nl")) {
          this.dataManager.setLanuage("Dutch");
      } else if (navigator.language.startsWith("pl")) {
          this.dataManager.setLanuage("Polish");
      } else if (navigator.language.startsWith("cs")) {
        this.dataManager.setLanuage("Czech");
      } else if (navigator.language.startsWith('de'))  {
          this.dataManager.setLanuage("German")
      } else {
          this.dataManager.setLanuage("English")
      }
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
