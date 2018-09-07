import { HttpInterceptor, HttpRequest } from '@angular/common/http/';
import {HttpEvent, HttpHandler} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Storage} from "@ionic/storage";

@Injectable()
export class HameCodeInterceptor implements HttpInterceptor {
  hamcode

  constructor(public _storage: Storage) {
    _storage.get('hamcode').then((val) => {
      console.log('Your hamcode: ', val);
      this.hamcode = val
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const changedReq = req.clone({headers: req.headers.set('x-auth', this.hamcode)});
    return next.handle(changedReq);
  }

}