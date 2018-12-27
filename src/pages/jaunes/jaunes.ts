import { Component, OnInit, ElementRef,ViewChild  } from '@angular/core';
import { NavController, NavParams,Searchbar  } from 'ionic-angular';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import { BlanchesPage } from '../blanches/blanches';
import { NgForm } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import {SearchJaunePage } from '../search-jaune/search-jaune';


@Component({
  selector: 'page-jaunes',
  templateUrl: 'jaunes.html',
})
export class JaunesPage{
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchVil') searchVil;
  xmlItems$;
  xmlOu$;
  list;
  searchTerm = new Subject<string>();
  searchTermOu = new Subject<string>();
  quiquoi: string='Camera de surveillance';
  ou: string ='Casablanca';
  searching: any =false;
 // @ViewChild('searchbar') searchBox: Searchbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private el: ElementRef) {
  }

    onGoBlanchesPage(){
       this.navCtrl.push(BlanchesPage);
    }
      search(term: string): void {
        this.searchTerm.next(term);
      }
      searchVille(term: string): void {
        this.searchTermOu.next(term);
      }
 
    ionViewDidLoad() {

    	     setTimeout(() => {
             this.searchBox.setFocus();
            },500);

         this.searching = false;
         this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(100),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)),
         );
         this.xmlOu$ =this.searchTermOu.pipe(
           debounceTime(100),
           distinctUntilChanged(),
           switchMap((term: string)=> this.auto_ouLoadXML(term)),
           );

    }

    selectValueQuiquoi(item){
      console.log(item);
      this.quiquoi = item.title;
       this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)));
    }
    selectValueOu(item){
      this.ou=item.title;
      this.xmlOu$ =this.searchTermOu.pipe(
           debounceTime(1000),
           distinctUntilChanged(),
           switchMap((term: string)=> this.auto_ouLoadXML(term)),
           );
    }

    onSearchInput(){
        this.searching = true;
    }

        checkFocus(){

                    this.xmlItems$ = this.searchTerm.pipe(
          debounceTime(1500),
          distinctUntilChanged(),
          switchMap((term: string) => this.auto_quiquoiLoadXML(term)),
         );
    }
    
    /* onSubmitForm(quioui: string, ou: string){
      
    }*/

    onDisplay(quiquoi, ou){
    	      console.log('itemitemitemitem');
      if(this.quiquoi=='' || this.quiquoi==null){
          
                    setTimeout(() => {
             this.searchBox.setFocus();
            },10);
      }
      else if(this.ou=='' || this.ou==null){
            
             setTimeout(() => {
             this.searchVil.setFocus();
             console.log('Focus',this.searchVil);
            },10);

      }       
        else {
        this.navCtrl.push(SearchJaunePage,{ou: this.ou, quiquoi: this.quiquoi})
      }
    }


    auto_quiquoiLoadXML(term: string){
      console.log(this.auto_quiquoiParseXML(term));
      return this.auto_quiquoiParseXML(term);      
    }

    auto_ouLoadXML(term: string){
      console.log(this.auto_ouParseXML(term));
      return this.auto_ouParseXML(term);      
    }


    auto_quiquoiParseXML(quiquoi){
         let yyy: any = [];
	      return new Promise((resolve,  reject) =>{

	        var autocomplete_quiquoi = quiquoi; 
	        var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
	        data_send += '  <methodcall>';
	        data_send += '    <methodname call="ann_sug">';  
	        data_send += '      <params>';  
	        data_send += '        <value>';
	        data_send += '          <string>'+autocomplete_quiquoi+'</string>';
	        data_send += '          <extract>5</extract>';  
	        data_send += '        </value>';
	        data_send += '      </params>';  
	        data_send += '    </methodname>';
	        data_send += '  </methodcall>';
	  
	    
		        $.ajax({
		          
		          type       : "POST",
		          url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
		          /*headers: {accepts: '*'}:*/
		          crossDomain: true,
		          beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
		          complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
		          data       : {telecontact : data_send},
		          dataType   : 'text',
		          success    : function(response) {
                     response =response.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;');
		            let parser = new xml2js.Parser(
		                   {
		                      trim: true,
		                      explicitArray: true
		                   });
		               parser.parseString(response, function (err, result)
		              {
		                
		                    
		               	
                       console.log('err',err);
		               for(let answers of result.search_answers.search_answer) {
		               	   // console.log('answers d',answers.items[0].$.count);
		               	    

		                     	if (answers.items[0]=="			") {

		               		               // yyy.push({'title': 'Aucun resultat'}); 
		              	        }else{

				                 for(let item of answers.items){
				                                  
				                   for(let i of item.item){
				                     
				                   yyy.push({'title': i.name[0]});                     
				                     /*for(let i_data of i.item_data){
				                        //console.log(i_data.data[1]._, i_data.data[1].$.name);
				                        yyy.push({'title': i_data.data[1]._});
				                       for(let data of i_data.data){
				                        
				                         yyy.push({key: data.$.name, value: data._});
				                         
				                       }
				                     }*/
				                   }
				                 }

		                        }
		               }
		               resolve(yyy);
		         
		              });
		          }, 
		          error: function(error){
		            console.log(error);
		            reject();

		          }
		        });
	      });
    }

    auto_ouParseXML(ou){
         let yyy: any = [];
	        return new Promise((resolve,  reject) =>{

	          var autocomplete_ou = ou; 
	          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
	            data_send += '  <methodcall>';
	            data_send += '    <methodname call="ann_sug">';  
	            data_send += '      <params>';  
	            data_send += '        <value>';
	            data_send += '          <ou>'+autocomplete_ou+'</ou>';
	            data_send += '          <extract>5</extract>';  
	            data_send += '        </value>';
	            data_send += '      </params>';  
	            data_send += '    </methodname>';
	            data_send += '  </methodcall>';
	    
	      
	          $.ajax({
	            
	            type       : "POST",
	            url        : "https://www.telecontact.ma/WsMobTlC2014nVZA",
	            /*headers: {accepts: '*'}:*/
	            crossDomain: true,
	            beforeSend : function() {$("#results_loading").append('<div class="noresults"><br /><br />Veuillez patienter<br /><br /><img src="media/images/home/load_result.gif" /></div>');/*$.mobile.loading('show')*/},
	            complete   : function() {$("#results_loading").hide();/*$.mobile.loading('hide')*/},
	            data       : {telecontact : data_send},
	            dataType   : 'text',
	            success    : function(response) {
                     console.log('response ville',response);
	              let parser = new xml2js.Parser(
	                     {
	                        trim: true,
	                        explicitArray: true
	                     });
	                 parser.parseString(response, function (err, result)
	                {
	                  
	                            
	                 for(let answers of result.search_answers.search_answer) {
	                                  	    console.log('answers d',answers);  

	                     	if (answers.items[0]=="			") {

	               		                //yyy.push({'title': 'Aucun resultat'}); 
	              	             }else{
	               
	                   for(let item of answers.items){
	                     
	                     for(let i of item.item){
	                       
	                       //for(let i_data of i.item_data){
	                          //console.log(i_data.data[1]._, i_data.data[1].$.name);
	                          yyy.push({'title': i.name[0]});
	                        /* for(let data of i_data.data){
	                          
	                           yyy.push({key: data.$.name, value: data._});
	                           
	                         }*/
	                       //}
	                     }
	                   }
	               }
	                 }
	                 resolve(yyy);
	             
	                });
	            }, 
	            error: function(error){
	              console.log(error);
	              reject();

	            }
	          });
	        });
    }
    

   

   /*parse1XML(data)
   {
     let yyy: any = [];
      return new Promise(resolve =>
      {
         var k,j,count,i,
             arr    = [],
             //item =[],

             parser = new xml2js.Parser(
             {
                trim: true,
                explicitArray: true
             });
      parser.parseString(data, function (err, result)
      {

                     console.log('answers', result);
         for(let answers of result.search_answers.search_answer) {
           //console.log('answers', answers);
           for(let item of answers.items){
             //console.log('item', item);
             for(let i of item.item){
               //console.log('i', i);
               for(let i_data of i.item_data){
                 //console.log('i_data', i_data);
                 for(let data of i_data.data){
                   this.yyy.push({key: data.$.name, value: data._});
                   
                 }
               }
             }
           }
         }
    

            resolve(yyy);
         });
      });
   }*/

  
     
  
}
