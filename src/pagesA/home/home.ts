import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  constructor(public navCtrl: NavController) {

  }
    ionViewDidLoad() {
    this.loadMap();
  }
    loadMap() {
    //ionic native google maps https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/README.md
    let options: GoogleMapOptions = {
      mapType: 'MAP_TYPE_NORMAL',
      controls: {
        'compass': true,
        'myLocationButton': true,
        'myLocation': true,   // (blue dot)
        'indoorPicker': true,
        'zoom': true,          // android only
        'mapToolbar': true     // android only
      },
      camera: {
        target: {
          lat: 46.52863469527167,
          lng: 2.43896484375
        }
      },
      preferences: {
        zoom: {
          minZoom: 1,
          maxZoom: 23
        },
        building: true
      }
    };
    //initialisation de la map
    this.map = GoogleMaps.create('map', options);

    //attend le chargement de la map pour ajouter des listeners
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    	console.log("map ready");
      this.map.setCameraZoom(5);

      //Listener sur un click maintenu sur la map pour afficher la modale pour ajouter un obstacle
      this.map.on(GoogleMapsEvent.MAP_LONG_CLICK).subscribe((params: any[]) => {
        console.log(params[0]);
      });
    });
  }
}
