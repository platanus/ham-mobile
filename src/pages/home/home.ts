import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Storage } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MarketPage } from '../market/market';
import { Subject } from 'rxjs/Subject';

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
  constructor(
    public navCtrl: NavController,
    private http: HTTP,
    private toastCtrl: ToastController,
    private store: Store<fromRoot.AppState>,
  ) {
    this.karma$ = this.store.select(fromRoot.getKarma);
    this.winners$ = this.store.select(fromRoot.getLunchWinners);
  }

  public ionViewWillEnter() {
    this.store.dispatch(new karma.GetKarma());
    this.store.dispatch(new lunch.GetWinners());
  }

  public ionViewWillLeave() {
    // Unsubscribe from all managed subscriptions
    this.unsubscribe.next();
    this.unsubscribe.unsubscribe();
  }

  public willLunch() {
    Storage.get({ key: 'hamcode' }).then(resp => {
      const hamcode = resp.value;
      const headers = {
        'Content-Type': 'application/json',
        'X-AUTH': hamcode,
      };

      this.http.post('http://pl-ham.herokuapp.com/current_lunchers', {}, headers).then(
        response => {
          const success = JSON.parse(response.data).success;
          if (success) {
            this.howManyWantToLunch(hamcode);
          } else {
            this.showToast('Error :( ');
          }
        },
        err => {
          const errorMessage = JSON.parse(err.error).message;
          this.showToast(errorMessage);
        },
      );
    });
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

  private howManyWantToLunch(hamcode: string) {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'X-AUTH': hamcode,
    };

    this.http.get('http://pl-ham.herokuapp.com/current_lunchers', {}, headers).then(
      response => {
        const wantToLunch: string = JSON.parse(response.data).current_lunchers.length;
        this.showToast('Hmm.. Ya van ' + wantToLunch + ' que les gustaría almorzar aquí hoy.');
      },
      err => {
        const errorMessage: string = JSON.parse(err.error).message;
        this.showToast(errorMessage);
      },
    );
  }
}
