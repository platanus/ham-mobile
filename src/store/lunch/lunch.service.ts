import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class LunchService {
  constructor(private http: HTTP) {}

  public getWinners(hamCode: string) {
    return this.http
      .get('http://pl-ham.herokuapp.com/winning_lunchers', {}, this.getHeaders(hamCode))
      .then(
        response => {
          return JSON.parse(response.data).winning_lunchers;
        },
        err => {
          const errorMessage: string = JSON.parse(err.error).message;
          throw errorMessage;
        },
      );
  }

  public getCurrentLunchers(hamCode: string) {
    return this.http
      .get('http://pl-ham.herokuapp.com/current_lunchers', {}, this.getHeaders(hamCode))
      .then(
        response => {
          return JSON.parse(response.data).current_lunchers;
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
