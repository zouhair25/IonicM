import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
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
    
    rs_abr1;
    rs_abr2;
    rs_abr3;
    code_firme;
    logo1;
    logo2;
    logo3;
    logo4;

    adresse0;
    adresse1;
    adresse2;

    ville0;
    ville1;
    ville2;
    ville3;

    telephone0;
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

    longitude0;
    longitude1;
    longitude2;
    longitude3;
    longitude4;
    longitude5;
    longitude6;
    longitude7;
    longitude8;
    longitude9;


    
    latitude0;
    latitude1;
    latitude2;
    latitude3;
    latitude4;
    latitude5;
    latitude6;
    latitude7;
    latitude8;
    latitude9;




    module1;
    module2;
    module3;

    video;
    poids;
    region;
    webinfo_link1;
    webinfo_link2;
    motcle;
    
    locateExiste: boolean =false;
    listPrestations: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation, private googleMaps: GoogleMaps,
              private platform: Platform) {
     
  }


   

        addMarker(){
          let title;
          if(this.rs_comp1){
            title =this.rs_comp1;
          }else{
            title =this.rs_comp2;
          }
        this.map.addMarker({
           title: title,
           icon: '#ffdd00',
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


     //recuperation des infos depuis la page search-jaune
     this.pro= this.navParams.get('pro');
    //this.loadmap();
    //console.log('loadmap',this.loadmap());


   this.code_firme=this.pro[0].code_firme;
   this.rs_comp1=this.pro[1].rs_comp;
   this.rs_comp2=this.pro[2].rs_comp;

   this.logo1=this.pro[2].logo;
   this.logo2=this.pro[3].logo;


   this.adresse0=this.pro[2].adresse;
   this.adresse1=this.pro[3].adresse;
   this.adresse2=this.pro[4].adresse;

   this.ville0=this.pro[3].ville;

   this.ville1=this.pro[4].ville;
   this.ville2=this.pro[5].ville;
   this.ville3=this.pro[6].ville;


   this.telephone0=this.pro[4].telephone1;
   this.telephone1=this.pro[5].telephone1;
   this.telephone2=this.pro[6].telephone1;

   this.fax1=this.pro[6].fax;
   this.fax2=this.pro[7].fax;
   this.fax3=this.pro[8].fax;
   console.log(this.fax3);

   this.email1=this.pro[7].email;
   this.email2=this.pro[8].email;

   this.longitude9=this.pro[7].longitude;
   this.latitude9=this.pro[8].latitude;

   this.web=this.pro[8].web;
   this.rubrique1=this.pro[9].rubrique;
   this.rubrique2=this.pro[10].rubrique;
   this.longitude0=this.pro[9].longitude;

   this.longitude8=this.pro[8].longitude;
   this.latitude8=this.pro[9].latitude;
   
   this.latitude0=this.pro[10].latitude;
   this.longitude7=this.pro[10].longitude;
   

   this.texte1=this.pro[10].texte;
   if(this.pro.length>11) {
      this.rubrique3=this.pro[11].rubrique;
      this.texte2=this.pro[11].texte;
      this.longitude1=this.pro[11].longitude;
       this.latitude7=this.pro[11].latitude;
   }
   

   if(this.pro.length>12) {
      this.longitude2=this.pro[12].longitude;
      this.rubrique4=this.pro[12].rubrique;
      this.latitude1=this.pro[12].latitude;
       console.log('latitude1',this.latitude1);
   }
   if(this.pro.length>13) {
      this.latitude2=this.pro[13].latitude;
      this.longitude3=this.pro[13].longitude;

   }
   if(this.pro.length>14) {
      this.video=this.pro[14].video;
      this.module1=this.pro[14].module;
      this.longitude4=this.pro[14].longitude;
      this.latitude3=this.pro[14].latitude;
      

   }
   if(this.pro.length>15) {
      this.poids=this.pro[15].poids;
      this.motcle=this.pro[15].motcle;
      this.module2=this.pro[15].module;
      this.latitude4=this.pro[15].latitude;
      this.longitude5=this.pro[15].longitude;
      

   }
   if(this.pro.length>16) {
      this.region=this.pro[16].region;
      this.module3=this.pro[16].module;
      this.longitude6=this.pro[16].longitude;  
      this.latitude5=this.pro[16].latitude;
      this.longitude6=this.pro[16].longitude; 
      console.log('module 2:',this.module3);
   }

   if(this.pro.length>17){
      this.latitude6=this.pro[17].latitude;
   }
   if(this.pro.length>18) {
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
        
        // le test sur l'existance de longitude et latitude
        if(this.longitude0 && this.latitude0){
          this.location =new LatLng(+this.latitude0,+this.longitude0);
        
        }
        else if(this.longitude1 && this.latitude1){
          this.location =new LatLng(+this.latitude1,+this.longitude1);
         
        }else if(this.longitude2 && this.latitude2){
           this.location =new LatLng(+this.latitude2,+this.longitude2);
           
        }else if(this.longitude3 && this.latitude3){
           this.location =new LatLng(+this.latitude3,+this.longitude3);
          
        } else if(this.longitude4 && this.latitude4){
           this.location =new LatLng(+this.latitude4,+this.longitude4);
          
        }
         else if(this.longitude5 && this.latitude5){
           this.location =new LatLng(+this.latitude5,+this.longitude5);
           
        }
         else if(this.longitude6 && this.latitude6){
           this.location =new LatLng(+this.latitude6,+this.longitude6);
          
        }
        else if(this.longitude7 && this.latitude7){
           this.location =new LatLng(+this.latitude7,+this.longitude7);
           
        }else if(this.longitude8 && this.latitude8){
           this.location =new LatLng(+this.latitude8,+this.longitude8);
           
        }
        else if(this.longitude9 && this.latitude9){
           this.location =new LatLng(+this.latitude9,+this.longitude9);
           
        }else{
          this.locateExiste =true;
        }

        //this.location =new LatLng(+this.latitude2,+this.longitude2);
        //this.location =new LatLng(33.512609,-7.659389);

        let options ={
          target: this.location,
          zoom: 16
        };
        this.map.moveCamera(options);
        setTimeout(()=>{this.addMarker()},2000);
      });

    });
      
      // recuperation des prestation
      this.listPrestations=this.prestation_dispaly(this.code_firme);
      console.log('this',this.listPrestations);
  }
  prestation_dispaly(code_firme){
    this.prestation(code_firme).then((data)=>{
       this.listPrestations=data;
    })
     return this.listPrestations;  
  }

 prestation(code_firme){
       let list: any = [];
       return new Promise((resolve,  reject) =>{
       let  start_files_sec =1;
       //let code_firme =2107435;
       var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="get_prestation_by_cf">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+code_firme+'</string>';
          data_send += '          <extract>5</extract>';  
          data_send += '        </value>';
          data_send += '      </params>';  
          data_send += '    </methodname>';
          data_send += '  </methodcall>';
       $.ajax({
              
              type       : "POST",
              url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
              //headers: {accepts: '*'},
              crossDomain: true,
              beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
              complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
              data       : {telecontact : data_send},
              dataType   : 'text',
              success    : function(response) {
                
                 
                let parser = new xml2js.Parser(
                       {
                          trim: true,
                          explicitArray: true
                       });
              parser.parseString(response, function (err, result){
                
                console.log('response ville',result);
                for(let answers of result.search_answers.search_answer) {
                                  console.log('answers d',answers);  

                         if (answers.items[0]=="      ") {

                                     //yyy.push({'title': 'Aucun resultat'}); 
                               }else{
                 
                     for(let item of answers.items){

                       for(let i of item.item){
                         //console.log('item d',i);
                         list.push({'title': i.name[0]});
      //console.log('this.listPrestations',list);

                       }
                     }
                   }
                 }
                 resolve(list);
                });
              }
       });
    });
     }

}
