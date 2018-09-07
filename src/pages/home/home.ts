import { Component } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { NavController } from 'ionic-angular';
import { Storage } from "@capacitor/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  karma: string
  hamcode: string
  lunchers: any

  constructor(public navCtrl: NavController, private http: HTTP) {
    Storage.get({key: 'karma'}).then((resp) => {
      this.karma = resp.value
    })
    Storage.get({key: 'hamcode'}).then((resp) => {
      const hamcode = resp.value
      console.log("HAMCODE FROM STORAGE: ", hamcode)
      this.updateKarma(hamcode)
      this.getWinningLunchers(hamcode)
    })

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
        const karma = JSON.parse(response.data).karma
        this.karma = karma
        Storage.set({
          key: 'karma',
          value: karma
        })
      },
      err => {
        const errorMessage = JSON.parse(err.error).message
        console.log(errorMessage)
      }
    )
  }

  getWinningLunchers(hamcode){
    if(!hamcode) return
    console.log("HAMCODE: ", hamcode)
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }

    this.http.get('http://pl-ham.herokuapp.com/winning_lunchers', {}, headers)
    .then(
      response => {
        const lunchers = JSON.parse(response.data).winning_lunchers
        this.lunchers = lunchers
      },
      err => {
        const errorMessage = JSON.parse(err.error).message
        console.log(errorMessage)
      }
    )
  }

  willLunch(){
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': this.hamcode
    }

    this.http.post('http://pl-ham.herokuapp.com/current_lunchers', {}, headers)
    .then(
      response => {
        const lunchers = JSON.parse(response.data).winning_lunchers
        this.lunchers = lunchers
      },
      err => {
        const errorMessage = JSON.parse(err.error).message
        console.log(errorMessage)
      }
    )
  }
}
