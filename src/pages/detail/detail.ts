import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides, Tabs} from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import {DataManagerProvider} from "../../providers/data-manager/data-manager";
import {MapPage} from "../map/map";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@IonicPage()
@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
})


export class DetailPage {
    @ViewChild('slider') slider: Slides;
    @ViewChild('baseTabs') tabRef: Tabs;
    @ViewChild('audioFiles') audioFiles;
    @ViewChild('audioTTS') audioTTS;

    locationDetails;
    city: string;
    language: string;
    color: string;
    pictures: string[];
    isPlayingAudio: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translate: TranslateService,
        public dataManager: DataManagerProvider,
        private tts: TextToSpeech) {

        //get the correct data to display
        this.locationDetails = this.navParams.get('locationFeature');
        this.pictures = this.locationDetails.properties.picture_name;

        this.dataManager.gaTrackView("Detail");


    }

    // TODO: on Iphone the audioFiles bar gets displayed even though there is no audioFiles
    // TODO: add auto audioFiles
    // TODO: add static maps


    ionViewDidLoad() {
        this.setupBackButtonBehavior();

        this.slider.autoHeight = true;

        // do not display secondary audioFiles by default
        this.audioTTS.nativeElement.style.display= 'none';

    }

    private noAudioFiles() {
        // hide audioFiles player
        console.log("error loading audioFiles file, hiding audioFiles player");
        this.audioFiles.nativeElement.style.display='none';

        //TODO: display TTS play button
        this.audioTTS.nativeElement.style.display= 'block';
    }

    public hideImage() {
        document.getElementById('slides-element').style.display='none';
        this.slider.paginationHide = true;
    }



    private setupBackButtonBehavior () {

        // If on web version (browser)
        if (window.location.protocol !== "file:") {

            // Register browser back button action(s)
            window.onpopstate = (evt) => {

                // Go back to rootPage is there is one
                if (this.navCtrl.canGoBack()) {
                    this.navCtrl.pop();
                }
            };
        }
    }


    private openMapPage() {
        this.navCtrl.push(MapPage, {viewSingleLocation: true, locationFeature: this.locationDetails})
        //this.navCtrl.pop();
        //this.tabRef.select(1)
    }

    private playAudioTTS() {
        if (this.isPlayingAudio) {
            // stop the audio by sending a empty string
            this.tts.speak("")
                .then(() => {
                    this.isPlayingAudio = false;
                    this.audioTTS.nativeElement.style.backgroundColor = '#222'
                })
                .catch((reason: any) => {
                    console.log("Error stopping audioFiles: "+ reason)
                });

            this.isPlayingAudio = false;

        } else {

            // play the text
            this.tts.speak({
                text: this.dataManager.getPropertyDescription(this.locationDetails),
                locale: this.getLocale()})
                .then(() => {
                    console.log("SUCCES PLAYING AUDIO");
                    this.isPlayingAudio = true;
                    this.audioTTS.nativeElement.style.backgroundColor = '#3fa535'
                })
                .catch((reason: any) => {
                    console.log(reason);
                });

            this.isPlayingAudio = true;
        }
    }

    private getLocale() {
        switch (this.dataManager.language) {
            case "English":
                return "en-GB";
            case "Dutch":
                return "nl-NL";
            case "German":
                return "de-DE";
            case "Czech":
                return "cz-CZ";
            case "Polish":
                return "pl-PL";
        }

        return "en-GB";
    }






}
