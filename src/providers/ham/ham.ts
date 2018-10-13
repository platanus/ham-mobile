import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HamProvider {
  private hamURL = 'http://pl-ham.herokuapp.com'

  constructor(private http: HTTP) {
    console.log('Hello HamProvider Provider');
  }

  getKarma(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    return new Promise(resolve => {
      console.log('PROVIDER');
      this.http.get(this.hamURL + '/karma', {}, headers).then(
        response => {
          resolve(JSON.parse(response.data));
        }, err => {
          console.log(err);
        });
    });
  }
}
