import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery';
import xml2js from 'xml2js';

@IonicPage()
@Component({
  selector: 'page-aproximite',
  templateUrl: 'aproximite.html',
})
export class AproximitePage {
  latitude;
  longitude;
  noResult: boolean = false; 
  list: any =[];
  categorie: string;
  quiquoi; 
  ou;
  listScroll;
  count; count1; count2; count3;
  items = [];
  start =1;
  extract =10;
  pos=0; 
  extract_sd=0;
  first   = 'result'; 
  second  ='result'; 
  third   = 'result'; 
  i=0;
  reste =this.start;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    //this.list=this.navParams.get('list')
    this.categorie=this.navParams.get('categorie');
    this.latitude= this.navParams.get('lat');
    this.longitude= this.navParams.get('lng');

    //this.categorie =this.appareil.cath;
    console.log('ionViewDidLoad categorie', this.categorie);
    console.log('ionViewDidLoad2 latitude', this.latitude);
    console.log('ionViewDidLoad2 longitude', this.longitude);
    

  
     this.onDisplayRaccourcis(this.latitude,this.longitude,this.categorie);
       //this.onDisplayRaccourcis(33.60480040521175,-7.522560798869609,this.categorie);
      
  

   /*let watch =this.geolocation.watchPosition();
       watch.subscribe((data)=>{
  

       })*/
       
   
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
      this.navCtrl.push('SingleProPage', {pro: pro})
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
   
    doInfinite(infiniteScroll) {
    console.log('Begin async operation');

      setTimeout(() => {

        if(this.start>this.count || this.extract<0 || this.count<10){
            infiniteScroll.enable(false);
                    console.log('this.start>this.count');
        }else{

          this.start=this.start+10;
          this.extract_sd=10;
           console.log('this.pos :', this.pos);
           if(this.pos==0){
             this.pos=this.pos+1;             
           }else{
             this.pos=this.pos+10;             
           }

                  

            infiniteScroll.complete();  
            this.i++;
            console.log('i :',this.i); 
            if(this.count-this.start<10 ){
              this.extract=this.count-this.start;
               console.log('this.extract',this.extract);
            }
            if(this.start>this.count1){
              this.first='complet';
                       console.log('first complet :', this.first);
            }
            if(this.count2==0){
              this.second='complet';
                       
                       console.log('second complet :', this.second);
            } 
            console.log('pos :', this.pos);
            console.log('extract_sd :', this.extract_sd);

            this.onSubmitFormScroll(this.quiquoi,this.ou, this.start, this.extract,this.first,this.second,this.third,this.pos,this.extract_sd);

           
        }

        
      }, 500); 
  }

  onSubmitFormScroll(quiquoi: string, ou: string, start,extract,first,second,third,pos,extract_sd){
                  console.log('jss in scrolling',this.count);
        

        this.listesResultatsScroll(quiquoi,ou, start,extract,first,second,third,pos,extract_sd).then(
          (data)=>{
           //console.log('data',data.length);
            for(let i=0 ; i<data[0].length;i++){
            this.list.push(data[0][i]);
    
          }
          console.log('this.list.push(data[0])',this.list);
        }
          );
         return this.list;      
  }

        listesResultatsScroll(quiquoi,ou,start=1,extract,first,second,third,pos,extract_sd ){
         let list: any = [];
         let count;
         let i;
          return new Promise((resolve,  reject) =>{
            
              console.log('apres for',start);
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
                       console.log('result', result);
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
