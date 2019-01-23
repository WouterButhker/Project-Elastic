import { Component } from '@angular/core';
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {ViewController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the LanguageCitySelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'language-selector',
  templateUrl: 'language-selector.html'
})
export class LanguageSelectorComponent {


  private selectedLanguage: string = this.dataManager.language;
  private cities;

  constructor(public dataManager: DataManagerProvider,
              public viewCtrl: ViewController,
              public translate: TranslateService) {
      this.selectedLanguage = dataManager.language;
      this.cities = this.dataManager.getCityData();

  }

  private changeLanguage() {
      this.translate.use(this.selectedLanguage);
      this.dataManager.language = this.selectedLanguage;
      this.dataManager.setFlag();
  }

  private changeLanguageAndQuit() {
      this.changeLanguage();
      this.viewCtrl.dismiss();
  }

  private cancel() {
      this.translate.use(this.dataManager.language);
      this.dataManager.setFlag();
  }

}
