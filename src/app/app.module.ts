import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MarketPage } from '../pages/market/market';
import { TabsPage } from '../pages/tabs/tabs';

import * as fromAuth from '../store/auth/auth.reducer';
import { AuthEffects } from '../store/auth/auth.effects';
import { AuthService } from '../store/auth/auth.service';

import * as fromKarma from '../store/karma/karma.reducer';
import { KarmaEffects } from '../store/karma/karma.effects';
import { KarmaService } from '../store/karma/karma.service';

import { HTTP } from '@ionic-native/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HamProvider } from '../providers/ham/ham';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MarketPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.forRoot({
      auth: fromAuth.reducer,
      karma: fromKarma.reducer,
    }),
    EffectsModule.forRoot([
      AuthEffects,
      KarmaEffects,
    ]),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    MarketPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HamProvider,
    AuthService,
    KarmaService,
  ],
})
export class AppModule {}
