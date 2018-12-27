import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from "@ionic-native/google-maps";
import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SearchJaunePage } from '../pages/search-jaune/search-jaune';
import { HomePage } from '../pages/search-jaune/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { FavorisPage } from '../pages/favoris/favoris';
import { HistoriquePage } from '../pages/historique/historique';
import { AppointmentPage } from '../pages/appointment/appointment';
import { LoginPage } from '../pages/login/login';
import { OptionsPage } from '../pages/options/options';
import { BlanchesPage } from '../pages/blanches/blanches';
import { JaunesPage } from '../pages/jaunes/jaunes';
import { AproximitePage } from '../pages/aproximite/aproximite';

import { SingleProPage } from '../pages/search-jaune/single-pro/single-pro';
import { Api } from '../providers/api';
import { Functions } from '../providers/functions';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    HistoriquePage,
    FavorisPage,
    AppointmentPage,
    LoginPage,
    OptionsPage,
    JaunesPage,
    BlanchesPage,
    SearchJaunePage,
    SingleProPage,
    AproximitePage
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage,
    HistoriquePage,
    FavorisPage,
    AppointmentPage,
    LoginPage,
    OptionsPage,
    JaunesPage,
    BlanchesPage,
    SearchJaunePage,
    SingleProPage,
    AproximitePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    Functions,
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
