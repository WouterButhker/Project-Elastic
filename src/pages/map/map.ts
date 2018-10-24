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
    this.map.data.loadGeoJson('assets/Json/Test.geojson');

  }


  initMap() {
    const almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
    const options = {
      center: almelo,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

  }

  // loadData($) {
  //   $.getJSON('Test.geojson', function (eventsData) {
  //     var eventsSize = Object.size(eventsData);
  //     console.log(eventsSize);
  //   })
  // }





}
