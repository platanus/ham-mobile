import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HamProvider {
  private hamURL = 'http://pl-ham.herokuapp.com'

  constructor(private http: HTTP) {
    console.log('Hello HamProvider Provider');
  }

  public getKarma(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    return this.http.get(this.hamURL + '/karma', {}, headers)
    .then(response => JSON.parse(response.data))
    .catch(err => console.log(err));
  }

  public getWinningLunchers(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    return this.http.get(this.hamURL + '/winning_lunchers', {}, headers)
      .then(response => JSON.parse(response.data))
      .catch(err => console.log(err));
  }

  public getLimitOrders(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    return this.http.get(this.hamURL + '/market/limit_orders', {}, headers)
      .then(response => JSON.parse(response.data))
      .catch(err => console.log(err));
  }

  public placeLimitOrder(hamcode){
    if(!hamcode) return
    const headers = {
      'Content-Type':  'application/json',
      'X-AUTH': hamcode
    }
    return this.http.post(this.hamURL + '/market/limit_orders', {}, headers)
      .then(response => JSON.parse(response.data))
      .catch(err => console.log(err));
  }


}
