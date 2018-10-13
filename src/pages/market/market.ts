import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from '@capacitor/core';
import { HamProvider } from '../../providers/ham/ham';

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  private karma: string;

  constructor(public navCtrl: NavController, public hamProvider: HamProvider, private toastCtrl: ToastController) {
    Storage.get({key: 'hamcode'}).then((resp) => {
      const hamcode = resp.value;
      this.updateKarma(hamcode);
    })
  }

  updateKarma(hamcode) {
    this.hamProvider.getKarma(hamcode)
    .then(reponse => {
      this.karma = reponse.karma;
      this.showToast(reponse);
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  goBack() {
    this.navCtrl.pop()
  }

  private sell() {
    console.log('SELL');
  }

  private buy() {
    console.log('BUY');
  }
}

