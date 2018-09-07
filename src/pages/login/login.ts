import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@capacitor/core";
import { TabsPage } from '../tabs/tabs';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private http: HTTP) {
    this.authForm = formBuilder.group({
      hamcode: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])],
  });
  }

  ionViewDidLoad() {
    this.checkCredentials().then((result) => {
      const userName = result.value
      if(userName){
        this.navCtrl.push(TabsPage)
      }
    })
  }

  logChange(event) {
    console.log(event)
  }

  checkCredentials() {
    const hamcode = Storage.get({ key: 'hamcode' })
    return hamcode
  }

  onSubmit(value: any): void {
    this.sendCode(value.hamcode)
  }

  sendCode(code) {
    if(!code) return
    console.log('AFTER RETURN')

    this.http.get('https://pl-ham.herokuapp.com/karma', {}, {
      'Content-Type':  'application/json',
      'X-AUTH': code
    })
                      .then(
                        data => {
                          console.log("DATA?")
                          alert(data)
                        },
                        err => {
                          console.log("ERROR :( ", JSON.stringify(err))
                        }
                      )
  }
}
