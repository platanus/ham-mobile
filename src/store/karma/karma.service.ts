import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class KarmaService {
  constructor(private http: HTTP) {}

  public getKarma(hamCode: string) {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'X-AUTH': hamCode,
    };

    return this.http.get('http://pl-ham.herokuapp.com/karma', {}, headers).then(
      res => {
        return JSON.parse(res.data).karma;
      },
      err => {
        const errorMessage: string = JSON.parse(err.error).message;
        throw errorMessage;
      },
    );
  }
}
