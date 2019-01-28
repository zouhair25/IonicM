import { Component,Pipe, PipeTransform  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
//var groupArray = require('group-array');

@IonicPage()
@Component({
  selector: 'page-pharmacie-result',
  templateUrl: 'pharmacie-result.html',
})
@Pipe({name: 'groupBy'})
export class PharmacieResultPage {
  list;
  ville;
  numero;
  result;

  list_quartier;
  currentLat;
  currentLng;
  count;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.list  = this.navParams.get('list');
    this.currentLat =this.navParams.get('lat');
    this.currentLng =this.navParams.get('lng');
    this.ville = this.list.titre;
    this.numero = this.list.numero;
    this.go_build_pharmacies_de_garde_liste(this.ville,1);

         // console.log('data',groupArray(this.arr,'tag'));

  }
    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push('SingleProPage', {pro: pro,lat: this.currentLat, lng: this.currentLng})
    }
    go_build_pharmacies_de_garde_liste(ville,  start){
    	this.go_search_pharmacies_de_garde_liste(ville,start).then((data)=>{
       
        this.result =this.transform(data[0],'quartier');
         this.count =data[1];
          console.log('count :',this.count);
     
    	});
    }
    
	go_search_pharmacies_de_garde_liste(ville,  start){
		let list: any = [];
     let count;
		return new Promise((resolve,reject)=>{
			var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
			data_send += '	<methodcall>';
			data_send += '		<methodname call="pharmacies_garde_results">';	
			data_send += '			<params>';	
			data_send += '				<value>';
			data_send += '					<ville>'+ville+'</ville>';
			//data_send += '					<x>'+lat+'</x>';
			//data_send += '					<y>'+lng+'</y>';
			data_send += '					<start>'+start+'</start>';
			data_send += '					<extract>200</extract>';	
			data_send += '				</value>';
			data_send += '			</params>';	
			data_send += '		</methodname>';
			data_send += '	</methodcall>';
                $.ajax({
                   type: "POST",
                   url: "https://www.telecontact.ma/WsMobTlC2014nVZA",
                   crossDomain: true,
                   data: {telecontact: data_send},
                   dataType: 'text',
                   success: function(response){
                       response =response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
		                let parser =new xml2js.Parser({
		                    trim: true,
		                    explicitArray: true                  
		                });
		                parser.parseString(response, function (err, result){
                        count =result.search_answers.search_answer[0].items[0].$.count;
                          for(let answers of result.search_answers.search_answer) {
                            for(let item of answers.items){
                              for(let i of item.item){  
                                for(let i_data of i.item_data){    
                                    let d: any =[];
			                        for(let data of i_data.data){
			                            let   type=data.$.name;
			                            d.push( {[type]: data._});

			                            //list.push({key: data.$.name, value: data._});
			                        
                              }          
                              if(d[4].quartier){
                                 list.push({quartier: d[4].quartier,d});
                                                
                              }else{
                                                 
                                 list.push({quartier: d[5].quartier,d});

                              }

                                 
                                 }
                              }
                            }                       
                          }
		                });
                    
                    resolve([list,count]);
                   }


            });
         })
    }

      transform(collection, property) {
        // prevents the application from breaking if the array of objects doesn't exist yet
        if(!collection) {
            return null;
        }

        const groupedCollection = collection.reduce((previous, current)=> {
            if(!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});

        // this will return an array of objects, each object containing a group of objects
        return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
   }
}