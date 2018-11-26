import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Events } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ContactPage;
  color: string = "almelo_green";
  languageCityObj: object;


  constructor(private event: Events) {


      // check if the city changed and change the color of the navbar
      this.event.subscribe("Language + city", (languageCity) => {
          this.color = languageCity.color;
          this.languageCityObj = languageCity;
      });




  }
}
