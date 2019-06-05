import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataManagerProvider} from "../../providers/data-manager/data-manager";

/**
 * Generated class for the ButtonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-button',
  templateUrl: 'button.html',
})
export class ButtonPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataManager: DataManagerProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ButtonPage');
      document.getElementById("groen").style.display= 'none'
  }


  launch() {
      document.getElementById('launch').style.display='none';
      document.getElementById('groen').style.display='block';

      setTimeout(() =>{
          this.navCtrl.pop();
      } , 3000)
      //this.navCtrl.pop();
  }


}
