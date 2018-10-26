import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MarketPage } from '../pages/market/market';

import * as fromAuth from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
import { AuthService } from '../store/auth/auth.service';

import * as fromKarma from '../store/karma/karma.reducer';
import { KarmaEffects } from '../store/karma/karma.effects';
import { KarmaService } from '../store/karma/karma.service';

import * as fromLunch from '../store/lunch/lunch.reducer';
import { LunchEffects } from '../store/lunch/lunch.effects';
import { LunchService } from '../store/lunch/lunch.service';

import * as fromMarket from '../store/market/market.reducer';
import { MarketEffects } from '../store/market/market.effects';
import { MarketService } from '../store/market/market.service';

import * as fromOffline from '../store/ionic-offline-support/ionic-offline-support.reducer';
import { IonicOfflineSupportEffects } from '../store/ionic-offline-support/ionic-offline-support.effects';
import { IonicOfflineService } from '../store/ionic-offline-support/ionic-offline-support.service';
import { storageSync } from '../store/ionic-offline-support/storage-sync';

import { HTTP } from '@ionic-native/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const metaReducers: MetaReducer<any>[] = [storageSync];

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MarketPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot(
      {
        auth: fromAuth.reducer,
        karma: fromKarma.reducer,
        lunch: fromLunch.reducer,
        market: fromMarket.reducer,
        offlineSupport: fromOffline.ionicOfflineSupportReducer,
      },
      {
        metaReducers,
      },
    ),
    EffectsModule.forRoot([
      AuthEffects,
      KarmaEffects,
      LunchEffects,
      MarketEffects,
      IonicOfflineSupportEffects,
    ]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    MarketPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    KarmaService,
    LunchService,
    MarketService,
    IonicOfflineService,
  ],
})
export class AppModule {}
