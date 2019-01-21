import { Component,Pipe, PipeTransform  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.list  = this.navParams.get('list');
    this.ville = this.list.titre;
    this.numero = this.list.numero;
    console.log('ionViewDidLoad PharmacieResultPage',this.list.numero);
    this.go_build_pharmacies_de_garde_liste(this.ville,1);

  }

    go_build_pharmacies_de_garde_liste(ville,  start){
    	this.go_search_pharmacies_de_garde_liste(ville,start).then((data)=>{
       
        this.result =data;
        	console.log('result :',this.result);

        for(let i of  this.result){
        	console.log('i :',i[5].quartier);
        }
console.log('list apres',this.transform(this.result,'this.result[5].quartier'));

    	});
    }
    
	go_search_pharmacies_de_garde_liste(ville,  start){
		let list: any = [];
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
                          for(let answers of result.search_answers.search_answer) {
                            for(let item of answers.items){
                              for(let i of item.item){  
                                for(let i_data of i.item_data){    
                                    let d: any =[];
			                        for(let data of i_data.data){
			                            let   type=data.$.name;
			                            d.push({[type]: data._});                         
			                            //list.push({key: data.$.name, value: data._});
			                        }                             
                                  list.push(d);
                                 }
                              }
                            }                       
                          }
		                });
                    resolve(list);
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
