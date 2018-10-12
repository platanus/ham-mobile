import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from "@capacitor/core";
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  authForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, private http: HTTP, private toastCtrl: ToastController){
    this.authForm = formBuilder.group({
      hamcode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
    });
  }

  ionViewDidLoad() {
    this.checkHamCode().then((result) => {
      const hamcode = result.value
      if(hamcode && parseInt(hamcode) >= 0){
        this.navCtrl.push(HomePage)
      }
    })
  }

  displayError(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  checkHamCode() {
    const hamcode = Storage.get({ key: 'hamcode' })
    return hamcode
  }

  onSubmit(value: any): void {
    this.sendCode(value.hamcode)
  }

  async storeInitialData(code, karma){
    await Storage.set({
      key: 'karma',
      value: karma
    })
    await Storage.set({
      key: 'hamcode',
      value: code
    })
  }

  sendCode(code) {
    if(!code) return
    const headers ={
      'Content-Type':  'application/json',
      'X-AUTH': code
    }

    this.http.get('http://pl-ham.herokuapp.com/karma', {}, headers)
      .then(
        response => {
          const karma = JSON.parse(response.data).karma
          this.storeInitialData(code, karma)
          this.navCtrl.push(HomePage)
        },
        err => {
          const errorMessage = JSON.parse(err.error).message
          this.displayError(errorMessage)
        }
      )
  }
}
