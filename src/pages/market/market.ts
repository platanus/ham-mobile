import { Component } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Storage } from '@capacitor/core';

import { HamProvider } from '../../providers/ham/ham';
import * as karma from '../../store/karma/karma.actions';
import * as lunch from '../../store/lunch/lunch.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  public karma$: Observable<string>;
  private hamcode: string;
  private limit_orders: any;
  private limit_ordersAmount: any;
  private status: boolean;

  constructor(
    public navCtrl: NavController,
    public hamProvider: HamProvider,
    private toastCtrl: ToastController,
    private store: Store<fromRoot.AppState>,
  ) {
    this.karma$ = this.store.select(fromRoot.getKarma);

    Storage.get({key: 'hamcode'}).then((resp) => {
      this.hamcode = resp.value;
      this.getLimitOrders(this.hamcode);
      this.showToast(this.limit_orders)
    });
  }

  public ionViewWillEnter() {
    this.store.dispatch(new karma.GetKarma());
  }

  public goBack() {
    this.navCtrl.pop();
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
      this.status = response.status;
      this.refresh();
      this.showToast(this.status)
    }).catch(err => {
      this.showToast(JSON.parse(err.error).message)
    });
  }

  private placeMarketOrder(hamcode) {
    this.hamProvider.placeMarketOrder(this.hamcode)
    .then(response => {
      this.status = response.status;
      this.refresh();
      this.showToast(this.status)
    }).catch(err => {
      this.showToast(JSON.parse(err.error).message)
    });
  }

  private showToast(message: string) {
    let toast: Toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  private sell() {
    this.showToast(this.limit_orders)
  }

  private buy() {
    this.showToast(this.karma)
  }
}

