import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from "@ngx-translate/core";

import { TabsPage } from '../pages/tabs/tabs';
import {IntroPage} from "../pages/intro/intro";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = IntroPage;

    constructor(
                platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                translate: TranslateService) {

        translate.setDefaultLang("Dutch"); // sets default language to Dutch

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleLightContent();
            splashScreen.hide();
        });


    }
}
