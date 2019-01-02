import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import {Events, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  color: string = this.navParams.get('color');
  languageCityObj: object;


  constructor(private event: Events, private navParams: NavParams) {


      // check if the city changed and change the color of the navbar
      this.event.subscribe("Language + city", (languageCity) => {
          this.color = languageCity.color;
          this.languageCityObj = languageCity;
      });




  }
}
