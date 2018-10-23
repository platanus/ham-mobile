import { Component } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Storage } from '@capacitor/core';

import * as karma from '../../store/karma/karma.actions';
import * as market from '../../store/market/market.actions';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  public karma$: Observable<string>;
  public limitOrders$: Observable<string[]>;
  private subscriptions: {[key: string]: Subscription} = {};

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private store: Store<fromRoot.AppState>,
  ) {
    this.karma$ = this.store.select(fromRoot.getKarma);
    this.limitOrders$ = this.store.select(fromRoot.getMarketLimitOrders);
  }

  public ionViewWillEnter() {
    this.store.dispatch(new karma.GetKarma());

    this.subscriptions.errors = this.store
      .select(fromRoot.getMarketErrorMessage)
      .subscribe(errorMessage => this.showToast(errorMessage));
  }

  public ionViewWillLeave() {
    // Unsubscribe from all managed subscriptions
    Object.keys(this.subscriptions).forEach((sub) => this.subscriptions[sub].unsubscribe());
  }

  public goBack() {
    this.navCtrl.pop();
  }

  public placeLimitOrder() {
    this.store.dispatch(new market.PlaceLimitOrder());
  }

  public placeMarketOrder() {
    this.store.dispatch(new market.PlaceMarketOrder());
  }

  private showToast(message: string) {
    let toast: Toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.present();
  }
}
