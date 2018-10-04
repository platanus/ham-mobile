import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@capacitor/core";
import { HTTP } from '@ionic-native/http';


@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  private karma: string;

  constructor(public navCtrl: NavController) {
    Storage.get({key: 'karma'}).then((resp) => {
      this.karma = resp.value;
    });
  }

  private sell() {
    undefined;
  }

  private buy() {
    undefined;
  }
}

