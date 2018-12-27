import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';

import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HistoriquePage } from '../historique/historique';
import { BlanchesPage } from '../blanches/blanches';

import { JaunesPage } from '../jaunes/jaunes';
import { Api } from "../../providers/api";

//declare var $: any;

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
@Injectable()
export class SearchPage {
  
  //var $: any;

  constructor(private navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController, private api: Api, private http: HttpClient,
              private geolocation: Geolocation) {
  }

  onGoJaunesPage(){
    this.navCtrl.push(JaunesPage);
  }
  onGoBlanchesPage(){
    this.navCtrl.push(BlanchesPage);
  }

  onShowList(){

  }

  ionViewDidLoad() {
 
     
/*this.geolocation.getCurrentPosition().then((resp)=>{
     console.log('Location', resp);
    }).catch((error) => {
     console.log('Error getting location', error);
   });
    console.log('ionViewDidLoad SearchPage');


   let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
          console.log("Latitude ",data.coords.latitude)   ;
          console.log("longitude ",data.coords.longitude)   ; 
          console.log("altitude ",data.coords.altitude)   ;      
          console.log("accuracy ",data.coords.accuracy)   ;      
          console.log("altitudeAccuracy   ",data.coords.altitudeAccuracy  )   ;      
          console.log("heading   ",data.coords.heading  )   ;      
          console.log("speed   ",data.coords.speed  )   ;      
          console.log("timestamp   ",data.timestamp)   ;      


       })*/
    
   
  /////////////////////////////////////
  }


    
  onToggleMenu(){
   this.menuCtrl.open();
  }

}
