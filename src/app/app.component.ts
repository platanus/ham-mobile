import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Store } from '@ngrx/store';

import { LoginPage } from '../pages/login/login';
import * as fromRoot from '../store';
import { TabsPage } from '../pages/tabs/tabs';

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

      this.store.select(fromRoot.getAuthHamCode).subscribe((hamCode) => {
        if (hamCode) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}
