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

    locationDetails;
    city: string;
    language: string;
    color: string;
    pictures: string[];
    isPlayingAudio: boolean = false;
    audioButtonColor: string = '#222';
    displayAudioFiles = true;
    displayAudioTTS = true;
    openedFromMap: boolean;

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

        this.setupAudioPlayer();

        this.openedFromMap = this.navParams.get('openedFromMap');
    }

    // TODO: on Iphone the audioFiles bar gets displayed even though there is no audioFiles
    // TODO: add auto audioFiles
    // TODO: add static maps


    ionViewDidLoad() {
        this.setupBackButtonBehavior();

        this.slider.autoHeight = true;


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

            this.audioButtonColor = '#222';
            this.isPlayingAudio = false;

            // stop the audio by sending a empty string
            this.tts.speak("")
                .catch((reason: any) => {
                    console.log("Error stopping audioFiles: "+ reason)
                });


        } else {
            this.audioButtonColor = '#3fa535';
            this.isPlayingAudio = true;
            this.displayAudioFiles = false;
            // play the text
            this.tts.speak({
                text: this.dataManager.getPropertyDescription(this.locationDetails),
                locale: this.getLocale()})
                .catch((reason: any) => {
                    console.log(reason);

                });
        }
    }

    private getLocale() {
        // TODO: android only supports English and German
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

    private setupAudioPlayer() {

        if (this.dataManager.language == "Dutch") {
            this.displayAudioTTS = false;
        } else if (this.dataManager.language == "English") {
            this.displayAudioTTS = true;
        }

        // TODO: update for audio files from Zelow and Nordhorn
        switch (this.dataManager.city) {
            case "Almelo":
                this.displayAudioFiles = false;
                break;
            case "Valasske":
                this.displayAudioFiles = true;
                this.displayAudioTTS = false;
                break;
            case "Zelow":
                this.displayAudioTTS = false;
                break;
            case "Norhorn":
                this.displayAudioTTS = true;
                this.displayAudioFiles = true;
                break;
        }

    }






}
