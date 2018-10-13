import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HamProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HamProvider Provider');
  }

}
