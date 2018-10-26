import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable()
export class AuthService {
  constructor(private http: HTTP) {}

  public login(hamCode: string) {
    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      'X-AUTH': hamCode,
    };

    return this.http.get('http://pl-ham.herokuapp.com/karma', {}, headers).then(
      _ => {
        return true;
      },
      err => {
        const errorMessage: string = JSON.parse(err.error).message;
        throw errorMessage;
      },
    );
  }
}
