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

 //test


  }

  ionViewDidLoad() {
    this.initMap();
    this.loadData();
  }

  initMap() {
    const almelo = new google.maps.LatLng(52.3570267, 6.668491899999935);
    const options = {
      center: almelo,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    var marker = new google.maps.Marker( {
      position: almelo,
      map:this.map,
      title: "YESS"
    })

    this.map.data.loadGeoJson('GeoJsons/Almelo.json');


  }

  loadData() {


  }



}
