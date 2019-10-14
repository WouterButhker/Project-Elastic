import {Component, ViewChild} from '@angular/core';
import {Content, Events, NavController, PopoverController, Searchbar} from "ionic-angular";
import {DetailPage} from "../detail/detail";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {LanguageCitySelectorComponent} from "../../components/language-city-selector/language-city-selector";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})


export class HomePage {
    @ViewChild('pageTop') pageTop: Content;
    @ViewChild('searchBar') searchBar: Searchbar;

    locations: object;
    searchTerm: string = "";
    categories; // TODO: categories (kleuren op de kaart)
    // TODO: route
    // TODO: pc view beautiful
    // TODO: fix compression photos

    constructor(
        private popoverCtrl: PopoverController,
        private navCtrl: NavController,
        private event: Events,
        public dataManager: DataManagerProvider
        ) {
            this.locations = this.dataManager.loadDataFromJson();

            // this.categories = ["factory", "factory owner's home", "other"];

            this.dataManager.gaTrackView("Home");

            // check if the language or city changed
            this.event.subscribe("Language + city", () => {

                this.locations = this.dataManager.loadDataFromJson();
            })


    }




    viewDetailPage(locationFeature) {
        //alert(loc.properties.name);
        this.navCtrl.push(DetailPage,
            {locationFeature: locationFeature, openedFromMap: false})
    }

    private openLanguageSelector(myEvent) {
        // remove search in case user changes language
        this.searchBar.clearInput(null);

        let popover = this.popoverCtrl.create(
            LanguageCitySelectorComponent,
            {},
            {cssClass: 'custom-popover'});

        popover.present( {
            ev: myEvent
        });

    }

    private search(ev: any) {

        if (ev == null) {
            this.searchTerm = "";
            return;
        }

        const term = ev.target.value;
        if (term == undefined) {
            this.searchTerm = "";
        } else {
            this.searchTerm = term;
        }
    }

    private toggleSearchBar() {
        // this.searchbar is the ionic searchbar
        // searchbar is the html searchbar
        const searchBar = document.getElementById('searchBar');

        if (searchBar.hidden) {
            this.pageTop.scrollToTop();
        } else {
            this.searchBar.clearInput(null);
        }

        searchBar.hidden = !searchBar.hidden;


    }





}
