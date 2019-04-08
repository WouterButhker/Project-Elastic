import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Events, MenuController, NavController, PopoverController} from "ionic-angular";
import {DetailPage} from "../detail/detail";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {LanguageCitySelectorComponent} from "../../components/language-city-selector/language-city-selector";


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {

    locations: object;
    categories; // TODO: categories


    constructor(
        private http: HttpClient,
        private popoverCtrl: PopoverController,
        private navCtrl: NavController,
        private event: Events,
        public dataManager: DataManagerProvider
        ) {

            this.locations = this.dataManager.loadDataFromJson();

            // this.categories = ["factory", "factory owner's home", "other"];


            // check if the language or city changed
            this.event.subscribe("Language + city", () => {

                this.locations = this.dataManager.loadDataFromJson();
            })


    }





    viewDetailPage(locationFeature) {
        //alert(loc.properties.name);
        this.navCtrl.push(DetailPage,
            {locationFeature: locationFeature})

    }

    private openLanguageSelector(myEvent) {
        let popover = this.popoverCtrl.create(
            LanguageCitySelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }





}
