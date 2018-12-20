import { Component, ViewChild } from '@angular/core';
import { Platform,NavController,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { FavorisPage } from '../pages/favoris/favoris';
import { HistoriquePage } from '../pages/historique/historique';
import { AppointmentPage } from '../pages/appointment/appointment';
import { LoginPage } from '../pages/login/login';
import { OptionsPage } from '../pages/options/options';
import { BlanchesPage } from '../pages/blanches/blanches';
import { JaunesPage } from '../pages/jaunes/jaunes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage:any = TabsPage;
  searchPage:any = SearchPage;
  favorisPage:any = FavorisPage;
  historiquePage:any = HistoriquePage;
  AppointmentPage:any = AppointmentPage;
  loginPage:any = LoginPage;
  @ViewChild('content') content: NavController;

  constructor(platform: Platform, statusBar: StatusBar,
   splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    onNavigate(page: any) {
    this.content.setRoot(page);
    this.menuCtrl.close();
  }
}
