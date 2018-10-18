import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class MarketService {
  constructor(private http: HTTP) {}

  public getLimitOrders(hamCode: string) {
    return this.http
      .get('http://pl-ham.herokuapp.com/market/limit_orders', {}, this.getHeaders(hamCode))
      .then(
        response => {
          console.log(response.data);
          return JSON.parse(response.data).limit_orders;
        },
        err => {
          const errorMessage: string = JSON.parse(err.error).message;
          throw errorMessage;
        },
      );
  }

  public placeLimitOrder(hamCode: string) {
    return this.http
      .post('http://pl-ham.herokuapp.com/market/limit_orders', {}, this.getHeaders(hamCode))
      .then(
        res => {
          return res.status;
        },
        err => {
          const errorMessage: string = JSON.parse(err.error).message;
          throw errorMessage;
        },
      );
  }

  public placeMarketOrder(hamCode: string) {
    return this.http
      .post('http://pl-ham.herokuapp.com/market/market_orders', {}, this.getHeaders(hamCode))
      .then(
        res => {
          return res.status;
        },
        err => {
          const errorMessage: string = JSON.parse(err.error).message;
          throw errorMessage;
        },
      );
  }

  private getHeaders(hamCode: string) {
    return {
      'Content-Type': 'application/json',
      'X-AUTH': hamCode,
    };
  }
}
