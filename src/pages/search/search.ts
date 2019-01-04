import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { Injectable } from '@angular/core';
import { BlanchesPage } from '../blanches/blanches';
import { JaunesPage } from '../jaunes/jaunes';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
@Injectable()
export class SearchPage {
  
  @ViewChild(Slides) slides: Slides;
  list;
  count;
  appareilsList  =[
    {
      name: 'Boulangerie',
      icon: 'ios-cafe-outline',
      cath: 'cath5',
    }
    ,
     {
      name: 'Café, bar',
      icon: 'ios-cafe-outline',
      cath: 'cath6'
    },
    {
      name: 'Essence',
      icon: 'ios-cafe-outline',
      cath: 'cath13',
    },
    {
      name: 'pharmacie',
      icon: 'ios-flask-outline',
      cath: 'cath25'      
     },
     /*{
      name: 'Laboratoire',
      icon: 'ios-flask-outline',
      cath: ''
     },
     {
      name: 'Restaurants',
      icon: 'ios-restaurant-outline',
      cath: ''
     },*/
    {
      name: 'Fleuriste',
      icon: 'ios-cafe-outline',
      cath: 'cath14',
    },
    {
      name: 'Hammam & spa',
      icon: 'ios-cafe-outline',
      cath: 'cath17',
    },
    {
      name: 'Hôtel',
      icon: 'ios-cafe-outline',
      cath: 'cath19',
    },
    {
      name: 'Kiné',
      icon: 'ios-cafe-outline',
      cath: 'cath21',
    },
    {
      name: 'Médecin',
      icon: 'ios-cafe-outline',
      cath: 'cath23',
    },
    /*{
      name: 'Boulangerie',
      icon: '',
      cath: 'cath5',
    }*/
  ]  
  constructor(private navCtrl: NavController, public navParams: NavParams,
              private menuCtrl: MenuController,
              private geolocation: Geolocation) {
  }
  
  goToSlide(){
    this.slides.slideTo(2,100);
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
 
     
this.geolocation.getCurrentPosition().then((resp)=>{
     console.log('Location', resp);
    }).catch((error) => {
     console.log('Error getting location', error);
   });
    console.log('ionViewDidLoad SearchPage');


   let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
          /*console.log("Latitude ",data.coords.latitude)   ;
          console.log("longitude ",data.coords.longitude)   ; 
          console.log("altitude ",data.coords.altitude)   ;      
          console.log("accuracy ",data.coords.accuracy)   ;      
          console.log("altitudeAccuracy   ",data.coords.altitudeAccuracy  )   ;      
          console.log("heading   ",data.coords.heading  )   ;      
          console.log("speed   ",data.coords.speed  )   ;      
          console.log("timestamp   ",data.timestamp)   ; */     

       //this.onDisplayRaccourcis(data.coords.latitude,data.coords.longitude);
       })
       
   
  /////////////////////////////////////
  }




    onDisplayByCategory(name: string){
      this.navCtrl.push('AproximitePage',{categorie: name});
    }
  onToggleMenu(){
   this.menuCtrl.open();
  }

}
