import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
//import leaflet from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng,
  Environment
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-single-pro',
  templateUrl: 'single-pro.html',
})
export class SingleProPage {
    map: GoogleMap;
    @ViewChild('map') mapElement: ElementRef;
    private location: LatLng; 
   
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
    longitude3;
    longitude4;
    longitude5;


    

    latitude1;
    latitude2;
    latitude3;
    latitude4;
    latitude5;



    module1;
    module2;
    module3;

    video;
    poids;
    region;
    webinfo_link1;
    webinfo_link2;
    motcle;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private googleMaps: GoogleMaps,
              private platform: Platform) {
     
  }

   
   /* loadMap() {
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
  }*/
   

        addMarker(){
         
        this.map.addMarker({
           title: 'My Marker',
           icon: 'blue',
           animation: 'Drop',
           position: {
             lat: this.location.lat,
             lng: this.location.lng
           }
        }).then(marker =>{
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
            alert('marker clicked');
          });
        })
      }
  ionViewDidLoad() {
    // this.loadMap();



     this.pro= this.navParams.get('pro');
    //this.loadmap();
    //console.log('loadmap',this.loadmap());
   console.log('i t : ', this.pro.length);
   console.log('longitude2 longitude2',this.longitude2);
   console.log('latitude2 latitude2',this.latitude2);

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
         console.log('longitude1',this.longitude1);
   }
   

   if(this.pro.length>11) {
      this.longitude2=this.pro[12].longitude;
      this.rubrique4=this.pro[12].rubrique;
      this.latitude1=this.pro[12].latitude;
       console.log('latitude1',this.latitude1);
   }
   if(this.pro.length>12) {
      this.latitude2=this.pro[13].latitude;
   }
   if(this.pro.length>13) {
      this.video=this.pro[14].video;
      this.module1=this.pro[14].module;
      this.longitude3=this.pro[14].longitude;
      
      console.log('module1 :',this.module1);
   }
   if(this.pro.length>15) {
      this.poids=this.pro[15].poids;
      this.motcle=this.pro[15].motcle;
      this.module2=this.pro[15].module;
      this.latitude3=this.pro[15].latitude;
      this.longitude4=this.pro[15].longitude;
      
       console.log('motcle :',this.motcle);  
   }
   if(this.pro.length>15) {
      this.region=this.pro[16].region;
      this.module3=this.pro[16].module;
      this.longitude5=this.pro[16].longitude;  
      this.latitude4=this.pro[16].latitude;

      console.log('module 2:',this.module3);
   }
   if(this.pro.length>17){
      this.latitude5=this.pro[17].latitude;
   }
   if(this.pro.length>19) {
      this.webinfo_link1=this.pro[19].webinfo_link;
   }   
   if(this.pro.length>20) {
      this.webinfo_link2=this.pro[20].webinfo_link;
   }  

   

    this.platform.ready().then(()=>{
      let element = this.mapElement.nativeElement;
      this.map =this.googleMaps.create('map');
      // this.map = GoogleMaps.create('map', options);
      this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
        
        if(this.longitude1 && this.latitude1){
          this.location =new LatLng(+this.latitude1,+this.longitude1);
          console.log('oui ici 1');
        }else if(this.longitude2 && this.latitude2){
           this.location =new LatLng(+this.latitude2,+this.longitude2);
          console.log('non ici 2',this.latitude2);
          console.log('non ici',this.longitude2);
          
        }else if(this.longitude3 && this.latitude3){
           this.location =new LatLng(+this.latitude3,+this.longitude3);
          console.log('non ici 3',this.latitude3);
          console.log('non ici',this.longitude3);
        } else if(this.longitude4 && this.latitude4){
           this.location =new LatLng(+this.latitude4,+this.longitude4);
          console.log('non ici 4',this.latitude4);
          console.log('non ici',this.longitude4);
        }else {
           this.location =new LatLng(+this.latitude5,+this.longitude5);
          console.log('non ici 3',this.latitude5);
          console.log('non ici',this.longitude5);          
        }
        console.log('non ici',this.location);
        //this.location =new LatLng(+this.latitude2,+this.longitude2);
        //this.location =new LatLng(33.512609,-7.659389);
          console.log('',this.location);

        let options ={
          target: this.location,
          zoom: 18
        };
        this.map.moveCamera(options);
        setTimeout(()=>{this.addMarker()},2000);
      });

    });
       
  }

}
