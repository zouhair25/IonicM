import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import {SingleProPage } from '../search-jaune/single-pro/single-pro';

@IonicPage()
@Component({
  selector: 'page-aproximite',
  templateUrl: 'aproximite.html',
})
export class AproximitePage {
  latitude;
  longitude;
  count;
  noResult: boolean = false; 
  list: any =[];
  categorie: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	          private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
  	//this.list=this.navParams.get('list')
  	this.categorie=this.navParams.get('categorie');
    //this.categorie =this.appareil.cath;
    //console.log('ionViewDidLoad AproximitePage', this.list);
    console.log('ionViewDidLoad2 categorie', this.categorie);

  this.geolocation.getCurrentPosition().then((data)=>{
     console.log('Location', data);
     this.onDisplayRaccourcis(data.coords.latitude,data.coords.longitude,this.categorie);
       //this.onDisplayRaccourcis(33.60480040521175,-7.522560798869609,this.categorie);
      
    }).catch((error) => {
     console.log('Error getting location', error);
   });


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

       })
       
   
  /////////////////////////////////////
  }
  

   onDisplayRaccourcis(latitude,longitude,cath){
     this.raccourcis(latitude,longitude,cath).then((data)=>{
     this.list = data[0],
     this.count =data[1];
     this.noResult=data[2];  
     console.log('data v', data); 
     console.log('data noResult', this.noResult);   

   }
     )
 } 
    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push(SingleProPage, {pro: pro})
    }
   // 
   raccourcis(x,y,cath){
      let list: any =[];
      let count;
      let noResult: boolean = false;
      return new Promise((resolve, reject) =>{
       let  start_files_sec =1;
       //let cath ="cath25";
       var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="cath_approxy">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+cath+'</string>';
          data_send += '            <x>'+x+'</x>';
          data_send += '            <y>'+y+'</y>';
          data_send += '            <start>1</start>';
          data_send += '          <extract>30</extract>';  
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
                    console.log(result);
                   if (result) {
                    	
                    
                                        count =result.search_answers.search_answer[0].items[0].$.count;
                       //count=result.search_answers.search_answer.items[0].$.count;
                   for(let answers of result.search_answers.search_answer) {                     
                         /*if (answers.items[0]=="      ") {
                                     list.push({'title': 'Aucun resultat'}); 
                               }else{*/
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
                         console.log('Aucun resultat');
                      } 
                     }
                   }  

                  }else{
                  	list.push();

                  	noResult =true;
                  	console.log('Pas de résultats à proximité de vous.');
                  	console.log('Pas de résultats à proximité de vous.',noResult);

                  }
                   resolve([list, count,noResult]);                
                })
              }
       });
     });
  }

}
