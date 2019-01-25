import { Component, ViewChild } from '@angular/core';
import { Platform,NavController,MenuController,AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
import { AppointmentPage } from '../pages/appointment/appointment';
import { BlanchesPage } from '../pages/blanches/blanches';
import { JaunesPage } from '../pages/jaunes/jaunes';
import { Api } from '../providers/api';
import { HttpClient } from '@angular/common/http';
import { Market } from '@ionic-native/market';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage: any = TabsPage;
  searchPage: any = 'SearchPage';
  favorisPage: any = 'FavorisPage';
  historiquePage: any = 'HistoriquePage';
  appointmentPage: any = 'AppointmentPage';
  loginPage: any = 'LoginPage';
  optionsPage: any = 'OptionsPage';
  aboutPage: any = 'AboutPage';
  
  version_actuell="0.1";
  version;
  mandatory;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private api: Api,
              private http: HttpClient,
              private alertController: AlertController,
              private market: Market) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
          
          //recuperation de version
   this.http.get("https://www.telecontact.ma/trouver/version_mobile.php").subscribe((data)=>{
    this.version =data.v;
    this.mandatory =data.m;
console.log('ver serv',this.version);
    
   });
// test de version actuell et l'autre version
setTimeout(()=>{
console.log('ver actuell',this.version_actuell);
console.log('ver serv',this.version);

  if(this.version!=this.version_actuell){

   this.presentAlert();
  }
},500)
  }

  //alert
   presentAlert(){
     let alert=this.alertController.create({
       title: "Mise à jour",
       subTitle: "Voulez-vous faire la Mise à jour",
       buttons: [
       {
         text: 'Annuler',
         role: 'cancel',
         handler: ()=>{
            console.log('Cancel clicked');
         }
       },
       {
         text: 'Mise à jour',
         handler: ()=>{
         this.market.open('telecontact');
         }
       }
       ]
     });
     alert.present();
   }
    onNavigate(page: any) {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }



  
 
}

