import { Component,HostListener } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { JaunesPage } from '../jaunes/jaunes';


@Component({
  selector: 'page-blanches',
  templateUrl: 'blanches.html',
})
export class BlanchesPage {
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlanchesPage');
  }
      
  onGoJaunesPage(){
    this.navCtrl.push(JaunesPage);
  }


}
