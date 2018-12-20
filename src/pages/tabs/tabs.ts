import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { HistoriquePage } from '../historique/historique';
import { FavorisPage } from '../favoris/favoris';
import { AppointmentPage } from '../appointment/appointment';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  search = SearchPage;
  about = AboutPage;
  contact = ContactPage;
  historique = HistoriquePage;
  favoris = FavorisPage;
  appointment =   AppointmentPage;
  login = LoginPage;
  constructor() {

  }
}
