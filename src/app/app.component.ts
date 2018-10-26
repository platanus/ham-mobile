import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/combineLatest';

import { LoginPage } from '../pages/login/login';
import * as fromRoot from '../store';
import { HomePage } from '../pages/home/home';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  public rootPage: any = LoginPage;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private store: Store<fromRoot.AppState>,
  ) {
    this.platform.ready().then(() => {
      this.statusBar.hide();
      this.splashScreen.hide();

      const initStatus$: Store<boolean> = this.store.select(fromRoot.getInitStatus);
      const loginStatus$: Store<boolean> = this.store.select(fromRoot.getAuthLogInStatus);

      Observable.combineLatest(initStatus$, loginStatus$).subscribe(([initialized, loggedIn]) => {
        if (initialized && loggedIn) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}
