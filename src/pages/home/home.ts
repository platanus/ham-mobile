import { Component } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MarketPage } from '../market/market';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/operators/merge';

import * as fromRoot from '../../store';
import * as karma from '../../store/karma/karma.actions';
import * as lunch from '../../store/lunch/lunch.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public karma$: Observable<string>;
  public winners$: Observable<string[]>;
  public hamcode: string;
  public lunchers: any;
  private subscriptions: {[key: string]: Subscription} = {};
  private waitingForResponse: boolean;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private store: Store<fromRoot.AppState>,
  ) {
    this.karma$ = this.store.select(fromRoot.getKarma);
    this.winners$ = this.store.select(fromRoot.getLunchWinners);
  }

  public ionViewWillEnter() {
    this.store.dispatch(new karma.GetKarma());
    this.store.dispatch(new lunch.GetWinners());

    this.subscriptions.lunchers = this.store
      .select(fromRoot.getLunchers)
      .subscribe(lunchers => {
        if (this.waitingForResponse) {
          const message: string = `Hmm.. Ya van ${
            lunchers.length
          } que les gustaría almorzar aquí hoy.`;
          this.showToast(message);
          this.waitingForResponse = false;
        }
      });

    this.subscriptions.errors = this.store
    .select(fromRoot.getMarketErrorMessage)
    .subscribe(errorMessage => {
      if (errorMessage) {
        this.showToast(errorMessage);
      }
    });
  }

  public ionViewWillLeave() {
    // Unsubscribe from all managed subscriptions
    Object.keys(this.subscriptions).forEach((sub) => this.subscriptions[sub].unsubscribe());
  }

  public willLunch() {
    this.store.dispatch(new lunch.SignUpForLunch());
    this.waitingForResponse = true;
  }

  public navigateBuySell() {
    this.navCtrl.push(MarketPage);
  }

  private showToast(message: string) {
    let toast: Toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      showCloseButton: true,
    });
    toast.present();

    toast.onDidDismiss(() => {
      this.store.dispatch(new karma.EraseError());
      this.store.dispatch(new lunch.EraseError());
    });
  }
}
