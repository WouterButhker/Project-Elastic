import { Component, ViewChild } from '@angular/core';
import { NavController, List } from 'ionic-angular';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
    @ViewChild(List) list: List;

    constructor(public navCtrl: NavController) {

    }



}
