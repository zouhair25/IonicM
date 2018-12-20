import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
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

      pro;
    rs_comp1;
    rs_comp2;

    code_firme;
    logo;
    adresse1;
    adresse2;
    ville1;
    ville2;
    ville3;
    telephone1;
    telephone2;
    fax1;
    fax2;
    fax3;

    email1;
    email2;

    web;
    rubrique1;
    rubrique2;
    rubrique3;
    rubrique4;
    texte1;
    texte2;

    longitude1;
    longitude2;

    latitude1;
    latitude2;

    module1;
    module2;
    module3;

    video;
    poids;
    region;
    webinfo_link1;
    webinfo_link2;
    motcle;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
    ionViewDidLoad() {
    this.loadMap();
     this.pro= this.navParams.get('pro');
    //this.loadmap();
    //console.log('loadmap',this.loadmap());
   console.log('i t : ', this.pro.length);
   console.log('ionViewDidLoad SinglePro',this.pro);
   this.code_firme=this.pro[0].code_firme;
   this.rs_comp1=this.pro[1].rs_comp;
   this.rs_comp2=this.pro[2].rs_comp;

   this.logo=this.pro[2].logo;
   this.adresse1=this.pro[3].adresse;
   this.adresse2=this.pro[4].adresse;


   this.ville1=this.pro[4].ville;
   this.ville2=this.pro[5].ville;
   this.ville3=this.pro[6].ville;



   this.telephone1=this.pro[5].telephone1;
   this.telephone2=this.pro[6].telephone1;

   this.fax1=this.pro[6].fax;
   this.fax2=this.pro[7].fax;
   this.fax3=this.pro[8].fax;
   console.log(this.fax3);

   this.email1=this.pro[7].email;
   this.email2=this.pro[8].email;

   this.web=this.pro[8].web;
   this.rubrique1=this.pro[9].rubrique;
   this.rubrique2=this.pro[10].rubrique;



   this.texte1=this.pro[10].texte;
   if(this.pro.length>10) {
      this.rubrique3=this.pro[11].rubrique;
      this.texte2=this.pro[11].texte;
      this.longitude1=this.pro[11].longitude;
   }
   

   if(this.pro.length>11) {
      this.longitude2=this.pro[12].longitude;
      this.rubrique4=this.pro[12].rubrique;
      this.latitude1=this.pro[12].latitude;
       console.log('latitude');
   }
   if(this.pro.length>13) {
      this.latitude2=this.pro[13].latitude;
   }
   if(this.pro.length>13) {
      this.video=this.pro[14].video;
      this.module1=this.pro[14].module;

      console.log('module1 :',this.module1);
   }
   if(this.pro.length>15) {
      this.poids=this.pro[15].poids;
      this.motcle=this.pro[15].motcle;
      this.module2=this.pro[15].module;

       console.log('motcle :',this.motcle);  
   }
   if(this.pro.length>15) {
      this.region=this.pro[16].region;
      this.module3=this.pro[16].module;
      console.log('module 2:',this.module3);
   }
   if(this.pro.length>19) {
      this.webinfo_link1=this.pro[19].webinfo_link;
   }   
   if(this.pro.length>20) {
      this.webinfo_link2=this.pro[20].webinfo_link;
   }  
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
          lat: 33.58434,
          lng: -7.598021
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
