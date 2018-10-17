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
  private lunchers: any;
  private lunchersAmount: any;

  constructor(public navCtrl: NavController, public hamProvider: HamProvider, private toastCtrl: ToastController) {
    Storage.get({key: 'hamcode'}).then((resp) => {
      const hamcode = resp.value;
      this.updateKarma(hamcode);
      this.getWinningLunchers(hamcode);
      this.showToast(this.karma);
    })
  }

  updateKarma(hamcode) {
    this.hamProvider.getKarma(hamcode)
    .then(response => {
      this.karma = response.karma;
    });
  }

  getWinningLunchers(hamcode) {
    this.hamProvider.getWinningLunchers(hamcode)
    .then(response => {
      this.lunchers = response.winning_lunchers;
      this.lunchersAmount = this.lunchers.length;

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
    this.showToast(this.lunchers)
  }

  private buy() {
    this.showToast(this.karma)
  }
}

