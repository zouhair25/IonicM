import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the HistoriquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {
     
     historiquePage = HistoriquePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	          private menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
  }
  
  onToggleMenu(){
   this.menuCtrl.open();
  }
}
