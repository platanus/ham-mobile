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
  private hamcode: string;
  private lunchers: any;
  private lunchersAmount: any;
  private limit_orders: any;
  private limit_ordersAmount: any;
  private status: boolean;

  constructor(public navCtrl: NavController, public hamProvider: HamProvider, private toastCtrl: ToastController) {
    Storage.get({key: 'hamcode'}).then((resp) => {
      this.hamcode = resp.value;
      this.updateKarma(this.hamcode);
      this.getWinningLunchers(this.hamcode);
      this.getLimitOrders(this.hamcode);
      this.showToast(this.limit_orders)
    });
  }

  private updateKarma(hamcode) {
    this.hamProvider.getKarma(hamcode)
    .then(response => {
      this.karma = response.karma;
    });
  }

  private getWinningLunchers(hamcode) {
    this.hamProvider.getWinningLunchers(hamcode)
    .then(response => {
      this.lunchers = response.winning_lunchers;
      this.lunchersAmount = this.lunchers.length;
    });
  }

  private getLimitOrders(hamcode) {
    this.hamProvider.getLimitOrders(hamcode)
    .then(response => {
      this.limit_orders = response.limit_orders;
      this.limit_ordersAmount = this.limit_orders.length;
    });
  }

  private placeLimitOrder() {
    this.hamProvider.placeLimitOrder(this.hamcode)
    .then(response => {
      this.status = response;
      this.showToast(this.status)
    });
  }

  private placeMarketOrder(hamcode) {
    this.hamProvider.placeMarketOrder(this.hamcode)
    .then(response => {
      this.status = response;
      this.showToast(this.status)
    });
  }

  private showToast(message) {
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
    this.showToast(this.limit_orders)
  }

  private buy() {
    this.showToast(this.karma)
  }
}

