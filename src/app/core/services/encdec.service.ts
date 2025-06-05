import { Injectable } from '@angular/core';
import { Params } from '../models/Params';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncdecService {
  SECRET_KEY = Params.sk;
  constructor() {}
  encrypt(data: any) {
    data = CryptoJS.AES.encrypt(data, this.SECRET_KEY);
    data = data.toString();
    return data;
  }

  decrypt(data: any) {
    data = CryptoJS.AES.decrypt(data, this.SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  }
}
