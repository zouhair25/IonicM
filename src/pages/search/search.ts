import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';

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
  list;
  count;
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

       this.onDisplayRaccourcis(data.coords.latitude,data.coords.longitude);
       })
       
   
  /////////////////////////////////////
  }

 onDisplayRaccourcis(latitude,longitude){
   this.raccourcis(latitude,longitude).then((data)=>{
     this.list = data[0],
     this.count =data[1];  
     console.log('data v', data); 
     console.log('data v', this.count);   

   }
     )
 } 
 raccourcis(x,y){
      let list: any =[];
      let count;
      return new Promise((resolve, reject) =>{
       let  start_files_sec =1;
       let cath ="cath13";
       var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="cath_approxy">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+cath+'</string>';
          data_send += '            <x>'+x+'</x>';
          data_send += '            <y>'+y+'</y>';
          data_send += '            <start>1</start>';
          data_send += '          <extract>10</extract>';  
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

                let parser =new xml2js.Parser({
                  trim: true,
                  explicitArray: true
                });
                parser.parseString(response, function(err, result){
               
                                        count =result.search_answers.search_answer[0].items[0].$.count;
                       //count=result.search_answers.search_answer.items[0].$.count;
                   for(let answers of result.search_answers.search_answer) {                     
                         if (answers.items[0]=="      ") {
                                     list.push({'title': 'Aucun resultat'}); 
                               }else{
                     for(let item of answers.items){                             
                      if(item.$.count>0)  {
                       for(let i of item.item){            
                         for(let i_data of i.item_data){    
                              let d: any =[];
                           for(let data of i_data.data){
                              let   type=data.$.name;
                            //console.log('type', type);                              
                              d.push({[type]: data._});                         
                             //list.push({key: data.$.name, value: data._});
                             }
                            list.push({d});  
                             //console.log('ici',list);                                                           
                         }
                       }
                      }else{
                         list.push({'title': 'Aucun resultat'}); 
                      } 
                     }
                 }
                   }
                   resolve([list, count]);                
                })
              }
       });
     });
  }

    onDisplayByCategory(){
      
    }
  onToggleMenu(){
   this.menuCtrl.open();
  }

}
