import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-pharmacie-garde',
  templateUrl: 'pharmacie-garde.html',
})
export class PharmacieGardePage {
  
  list;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.list = this.navParams.get('list');

    console.log('ionViewDidLoad PharmacieGardePage',this.list);
  }

  onDisplayPharmacieGarde(list: {titre: string, numero: string}){
    console.log('ionViewDidLoad PharmacieGardePage',this.list);
  	
  	this.navCtrl.push('PharmacieResultPage',{list: list});
  }

}
