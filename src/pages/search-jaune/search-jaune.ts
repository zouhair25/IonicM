import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subject } from 'rxjs';
import * as $ from 'jquery';
import xml2js from 'xml2js';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

//import { CompletePageJaunesService } from '../../providers/CompletePageJaunes.service';
import {SingleProPage } from './single-pro/single-pro';
import { HomePage } from './home/home';
@Component({
  selector: 'page-search-jaune',
  templateUrl: 'search-jaune.html',
})
export class SearchJaunePage implements OnInit{
  quiquoi; 
  ou;
  list;
  listScroll;
  count;
  items = [];
  private searchTerms = new Subject<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	          ) {
    /*for(let i=0;i<30; i++){
      this.items.push(this.items.length);
    }*/
  }
  
 doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      /*for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }*/
      this.onSubmitFormScroll(this.quiquoi,this.ou)
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  ionViewDidLoad() {
   
        this.quiquoi =this.navParams.get('quiquoi');
        this.ou =this.navParams.get('ou');
  }
  ionViewDidEnter (){

   this.list = this.onSubmitForm(this.quiquoi,this.ou);
       console.log('quiquoi :', this.quiquoi);
       console.log('ou :', this.ou);
  }

        onSubmitForm(quiquoi: string, ou: string){
      this.listesResultats(quiquoi,ou).then(
        (data)=>{this.list=data[0],this.count=data[1]
        console.log('yes now ssss',this.count);
      }
        );

    
      //this.navCtrl.push(SearchJaunePage,{list: this.list});
      return this.list;      
    }
            onSubmitFormScroll(quiquoi: string, ou: string){
      this.listesResultatsScroll(quiquoi,ou).then(
        (data)=>{
          for(let i=0 ; i<data.length;i++){
          this.list.push(data[0][i]);
        console.log('data[0]',data[0][i]);
        }
        console.log('this.list.push(data[0])',this.list);

      }
        );
       return this.list;      
    }
    
    onGoMaps(){
       this.navCtrl.push(HomePage);
    }
    onDisplayPro(pro: {rs_comp: string, adresse: string}){
      this.navCtrl.push(SingleProPage, {pro: pro})
    }

  ngOnInit(){

  }

      listesResultatsScroll(quiqoui,ou){
         let list: any = [];
         let count;
          return new Promise((resolve,  reject) =>{

              var quiquoi = this.quiquoi; 
              var ou = this.ou; 

              var start   = '6'; 
              var first   = 'result'; 
              var second  ='result'; 
              var third   = 'result'; 
              var pos     = '0'; 
              var extract_sd   = '0'; 
              var extract ='4',


          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="hmida">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+quiquoi+'</string>';
          data_send += '          <ou>'+ou+'</ou>';
          data_send += '          <region>Rabat-Salé-Zemmour-Zaër</region>';
          data_send += '          <start>'+start+'</start>';
          data_send += '          <extract>'+extract+'</extract>';  
          data_send += '          <first>'+first+'</first>';  
          data_send += '          <second>'+second+'</second>';  
          data_send += '          <third>'+third+'</third>';
          data_send += '          <pos>'+pos+'</pos>';
          data_send += '          <extract_sd>'+extract_sd+'</extract_sd>';
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
                       console.log('result', result.search_answers.search_answer[0].items[0].$.count);
                        count =result.search_answers.search_answer[0].items[0].$.count;
                       //count=result.search_answers.search_answer.items[0].$.count;
                   for(let answers of result.search_answers.search_answer) {
                          

                         if (answers.items[0]=="      ") {

                                     list.push({'title': 'Aucun resultat'}); 
                               }else{

                     for(let item of answers.items){
                             console.log('i :',item.$.count);   
                      if(item.$.count>0)  {
                       for(let i of item.item){
            
                         for(let i_data of i.item_data){
    
                              let d: any =[];
                           for(let data of i_data.data){
                                                 //console.log(data.$);
                               //console.log('data',data);
                            let   type=data.$.name;
                            //console.log('type', type);
                                   
                            d.push({[type]: data._});
                             
                             //list.push({key: data.$.name, value: data._});

                             }
                            list.push({d});
                            
                             
                           
                         }
                       }
                      }else{
                         list.push({'title': 'Aucun resultat'}); 
                      } 
                     }
                 }
                   }
                   resolve([list,count]);
                   console.log('dd :',list);
                             //this.list=list;

                  });
              }, 
              error: function(error){
                console.log(error);
                reject();

              }
            });
          });

    }
      listesResultats(quiqoui,ou){
         let list: any = [];
         let count;
          return new Promise((resolve,  reject) =>{

              var quiquoi = this.quiquoi; 
              var ou = this.ou; 

              var start   = '1'; 
              var first   = 'result'; 
              var second  ='result'; 
              var third   = 'result'; 
              var pos     = '0'; 
              var extract_sd   = '0'; 
              var extract ='5',


          var data_send  = '<?xml version="1.0" encoding="UTF-8" ?>';
          data_send += '  <methodcall>';
          data_send += '    <methodname call="hmida">';  
          data_send += '      <params>';  
          data_send += '        <value>';
          data_send += '          <string>'+quiquoi+'</string>';
          data_send += '          <ou>'+ou+'</ou>';
          data_send += '          <region>Rabat-Salé-Zemmour-Zaër</region>';
          data_send += '          <start>'+start+'</start>';
          data_send += '          <extract>'+extract+'</extract>';  
          data_send += '          <first>'+first+'</first>';  
          data_send += '          <second>'+second+'</second>';  
          data_send += '          <third>'+third+'</third>';
          data_send += '          <pos>'+pos+'</pos>';
          data_send += '          <extract_sd>'+extract_sd+'</extract_sd>';
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
                       console.log('result', result.search_answers.search_answer[0].items[0].$.count);
                        count =result.search_answers.search_answer[0].items[0].$.count;
                       //count=result.search_answers.search_answer.items[0].$.count;
                   for(let answers of result.search_answers.search_answer) {
                          

                         if (answers.items[0]=="      ") {

                                     list.push({'title': 'Aucun resultat'}); 
                               }else{

                     for(let item of answers.items){
                             console.log('i :',item.$.count);   
                      if(item.$.count>0)  {
                       for(let i of item.item){
            
                         for(let i_data of i.item_data){
    
                              let d: any =[];
                           for(let data of i_data.data){
                                                 //console.log(data.$);
                               //console.log('data',data);
                            let   type=data.$.name;
                            //console.log('type', type);
                                   
                            d.push({[type]: data._});
                             
                             //list.push({key: data.$.name, value: data._});

                             }
                            list.push({d});
                            
                             
                           
                         }
                       }
                      }else{
                         list.push({'title': 'Aucun resultat'}); 
                      } 
                     }
                 }
                   }
                   resolve([list,count]);
                   console.log('dd :',list);
                             //this.list=list;

                  });
              }, 
              error: function(error){
                console.log(error);
                reject();

              }
            });
          });

    }
}
