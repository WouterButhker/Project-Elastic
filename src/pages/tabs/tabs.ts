import { Component } from '@angular/core';

import { MapPage } from '../map/map';
import { HomePage } from '../home/home';
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;


  constructor(private dataManager: DataManagerProvider, private navParams: NavParams) {

  }
}
