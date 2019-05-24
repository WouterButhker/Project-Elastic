import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {HttpClient, HttpClientModule} from "@angular/common/http";

import { MapPage } from '../pages/map/map';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage} from "../pages/detail/detail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LanguageCitySelectorComponent} from "../components/language-city-selector/language-city-selector";
import { LanguageSelectorComponent } from "../components/language-selector/language-selector";
import { TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {IntroPage} from "../pages/intro/intro";
import { DataManagerProvider } from '../providers/data-manager/data-manager';
import {Geolocation } from "@ionic-native/geolocation";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

@NgModule({
    declarations: [
        MyApp,
        MapPage,
        ContactPage,
        HomePage,
        IntroPage,
        TabsPage,
        DetailPage,
        LanguageCitySelectorComponent,
        LanguageSelectorComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (setTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MapPage,
        ContactPage,
        HomePage,
        IntroPage,
        TabsPage,
        DetailPage,
        LanguageCitySelectorComponent,
        LanguageSelectorComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpClientModule,
        DataManagerProvider,
        Geolocation,
        GoogleAnalytics
    ]
})
export class AppModule {


}

// changes default translation folder to /assets/i18n/
export function setTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
