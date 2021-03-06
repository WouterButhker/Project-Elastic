import { Component, ViewChild } from '@angular/core';
import { NavController, List } from 'ionic-angular';
import { DataManagerProvider } from "../../providers/data-manager/data-manager";


@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
    @ViewChild(List) list: List;

    constructor(public navCtrl: NavController, private datamanager: DataManagerProvider) {

        // this.contributors = this.loadDataFromJson();
        this.datamanager.gaTrackView("Contact");
    }


}
