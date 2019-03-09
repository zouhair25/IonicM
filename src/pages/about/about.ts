import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController,
              private firebaseAnalytics: FirebaseAnalytics) {

  }
  onToggleMenu(){
   this.menuCtrl.open();
  }

  ionViewDidLoad() {
  	  //google firebase
    this.firebaseAnalytics.logEvent('about', {page: "about"})
  .then((res: any) => console.log(res))
  .catch((error: any) => console.error(error));
  }
}
