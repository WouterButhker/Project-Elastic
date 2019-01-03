import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from "@ngx-translate/core";
import {IntroPage} from "../pages/intro/intro";
import {TabsPage} from "../pages/tabs/tabs";
import {ContactPage} from "../pages/contact/contact";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = IntroPage;
    @ViewChild(Nav) nav: Nav;

    constructor(
                platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                translate: TranslateService) {

        translate.setDefaultLang("Dutch"); // sets default language to Dutch
        // TODO: set default language based on locale

        platform.ready().then(() => {

            statusBar.styleLightContent();
            splashScreen.hide();
        });


    }

    start(city, language, color, country) {
        if (city == "Intro") {
            this.nav.setRoot(IntroPage)
        } else if (city == "Contact") {
            this.nav.push(ContactPage)
        } else {
            this.nav.setRoot(TabsPage, {
                city: city,
                language: language,
                color: color,
                image: 'assets/Pictures/Flags/' + country +  ".png"
            });
        }


    }
}
