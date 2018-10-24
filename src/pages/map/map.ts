import { Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    map: any;

    @ViewChild('map') mapElement;

    constructor(public navCtrl: NavController) {

    }



    ionViewDidLoad() {
        this.initMap();

    }


    initMap() {
        const almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
        const options = {
            center: almelo,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, options);

        this.map.data.loadGeoJson('assets/Json/Almelo.json'); //TODO: add compatibility for other places

        var infoWindow = new google.maps.InfoWindow();



        this.map.data.addListener('click', function (event) {
            var name = event.feature.getProperty('name');
            var time = event.feature.getProperty('time');
            var picture = event.feature.getProperty('picture');


            var content =
                '<div id="infowindow"> ' +
                    '<div id="thumbnail">' +
                        '<img id="thumbnailPicture" src=" ' + picture + ' "> ' +
                    '</div> ' +

                    '<div id="content"> ' +
                        '<h2>' + name + '</h2>' +
                        ' <p id="time"> ' + time + '</p> ' +
                    '</div> ' +
                '</div>';

            infoWindow.setContent(content);

            // only show picture and time when there actually is a picture
            // if(picture === "") {
            //     document.getElementById('thumbnail').style.display = 'none';
            // }
            // if (time === undefined) {
            //     document.getElementById('time').style.display = 'none';
            // }

            infoWindow.setPosition(event.latLng);

            // bij markers de infowindow boven de marker weergeven ipv er in
            infoWindow.setOptions({pixelOffset: new google.maps.Size(0,0)});
            if (event.feature.getGeometry().getType() === "Point") {
                infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-40)});
            }

            infoWindow.open(this.map);

            })

        // loadData($) {
        //   $.getJSON('Test.geojson', function (eventsData) {
        //     var eventsSize = Object.size(eventsData);
        //     console.log(eventsSize);
        //   })
        // }

    }



}


