<<<<<<< HEAD
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http';
=======
import { Component } from '@angular/core';
>>>>>>> feat(lunch): use store for lunch registration
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MarketPage } from '../market/market';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/operators/merge';

import * as fromRoot from '../../store';
import * as karma from '../../store/karma/karma.actions';
import * as lunch from '../../store/lunch/lunch.actions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public karma$: Observable<string>;
  public winners$: Observable<string[]>;
  public hamcode: string;
  public lunchers: any;
  private unsubscribe: Subject<void> = new Subject();
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

    this.store
      .select(fromRoot.getLunchers)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(lunchers => {
        if (this.waitingForResponse) {
          const message: string = `Hmm.. Ya van ${
            lunchers.length
          } que les gustaría almorzar aquí hoy.`;
          this.showToast(message);
          this.waitingForResponse = false;
        }
      });

    this.store
      .select(fromRoot.getKarmaErrorMessage)
      .pipe(merge(this.store.select(fromRoot.getLunchErrorMessage)))
      .subscribe(errorMessage => this.showToast(errorMessage));
  }

  public ionViewWillLeave() {
    // Unsubscribe from all managed subscriptions
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
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
    });
    toast.present();
  }
}
