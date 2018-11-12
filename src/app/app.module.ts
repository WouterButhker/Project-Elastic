import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HttpClientModule} from "@angular/common/http";

import { MapPage } from '../pages/map/map';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage} from "../pages/detail/detail";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LanguageSelectorComponent} from "../components/language-selector/language-selector";

@NgModule({
    declarations: [
        MyApp,
        MapPage,
        ContactPage,
        HomePage,
        TabsPage,
        DetailPage,
        LanguageSelectorComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        MapPage,
        ContactPage,
        HomePage,
        TabsPage,
        DetailPage,
        LanguageSelectorComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpClientModule
    ]
})
export class AppModule {}
