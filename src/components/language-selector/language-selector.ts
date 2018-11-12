import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";

/**
 * Generated class for the LanguageSelectorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'language-selector',
  templateUrl: 'language-selector.html'
})
export class LanguageSelectorComponent {


  nativeLanguage: string;
  nativeFlag: string;
  selectedCity: string;
  selectedLanguage: string;

  constructor(public viewCtrl: ViewController) {
    this.nativeLanguage = 'Dutch';
    this.nativeFlag = 'netherlands.png';
      this.selectedLanguage = 'Dutch';
      this.selectedCity = 'Almelo';
  }

  cancelLanguage() {
      this.viewCtrl.dismiss();
  }

  saveLanguage(city, language) {
    console.log(this.selectedCity);
    console.log(this.selectedLanguage);

  }

}
