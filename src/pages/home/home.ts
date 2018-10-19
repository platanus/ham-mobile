import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController, ToastController } from 'ionic-angular';
import { Storage } from "@capacitor/core";
import { MarketPage } from '../market/market';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('willLunchButton')
  willLunchButton: ElementRef
  private karma: string
  private hamcode: string
  private lunchers: any
  private lunchersAmount: any

  constructor(public navCtrl: NavController, private http: HTTP, private toastCtrl: ToastController){
    Storage.get({key: 'karma'}).then((resp) => {
      this.karma = resp.value;
    })
    Storage.get({key: 'hamcode'}).then((resp) => {
      this.hamcode = resp.value
      this.updateKarma(this.hamcode);
      this.getWinningLunchers(this.hamcode);
    })
  }

  ngOnInit() {
    this.updateKarma(this.hamcode);
    this.getWinningLunchers(this.hamcode);
  }

  ionViewWillEnter() {
    this.updateKarma(this.hamcode);
    this.getWinningLunchers(this.hamcode);
  }
  
  updateKarma(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    this.http.get('http://pl-ham.herokuapp.com/karma', {}, headers)
    .then(
      response => {
        const karma = JSON.parse(response.data).karma;
        this.karma = karma;
        Storage.set({
          key: 'karma',
          value: karma
        })
      },
      err => {
        const errorMessage = JSON.parse(err.error).message;
        this.showToast(errorMessage);
      }
    )
  }

  getWinningLunchers(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }

    this.http.get('http://pl-ham.herokuapp.com/winning_lunchers', {}, headers)
    .then(
      response => {
        const lunchers = JSON.parse(response.data).winning_lunchers;
        this.lunchers = lunchers;
        this.lunchersAmount = lunchers.length;
      },
      err => {
        const errorMessage = JSON.parse(err.error).message;
        this.showToast(errorMessage);
      }
    )
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  navigateBuySell() {
    this.navCtrl.push(MarketPage);
  }

  howManyWantToLunch(hamcode){
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }

    this.http.get('http://pl-ham.herokuapp.com/current_lunchers', {}, headers)
    .then(
      response => {
        const wantToLunch = JSON.parse(response.data).current_lunchers.length;
        this.showToast('Hmm.. Ya van ' + wantToLunch + ' que les gustaría almorzar aquí hoy.');
      },
      err => {
        const errorMessage = JSON.parse(err.error).message;
        this.showToast(errorMessage);
      }
    )
  }

  willLunch(){
    Storage.get({key: 'hamcode'}).then((resp) => {
      const hamcode = resp.value;
      const headers = {
        'Content-Type':  'application/json',
        'X-AUTH': hamcode
      }

      this.http.post('http://pl-ham.herokuapp.com/current_lunchers', {}, headers)
      .then(
        response => {
          const success = JSON.parse(response.data).success;
          if(success){
            this.howManyWantToLunch(hamcode);
          } else {
            this.showToast("Error :( ");
          }
        },
        err => {
          const errorMessage = JSON.parse(err.error).message;
          this.showToast(errorMessage);
        }
      )
    })
  }
}
