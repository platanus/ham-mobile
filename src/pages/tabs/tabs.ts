import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MarketPage } from '../market/market';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  public tab1Root: Function = HomePage;
  public tab2Root: Function = AboutPage;
  public tab3Root: Function = ContactPage;
  public tab4Root: Function = MarketPage;

  constructor() {

  }
}
