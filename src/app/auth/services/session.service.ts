// import { inject, Injectable } from '@angular/core';
// import { EncdecService } from '../../core/services/encdec.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class SessionService {
//   private encdecService = inject(EncdecService);
//   constructor() {}
//   setSession(key: string, value: any) {
//     let valueString = JSON.stringify(value);
//     let enc = this.encdecService.encrypt(valueString);
//     sessionStorage.setItem(key, enc);
//   }
//   getSession(key: string) {
//     let user = JSON.parse(
//       this.encdecService.decrypt(sessionStorage.getItem(key))
//     );
//     return user;
//   }
//   clearSession() {
//     sessionStorage.clear();
//   }
//   removeSession(key: string) {
//     sessionStorage.removeItem(key);
//   }
// }


import { inject, Injectable } from '@angular/core';
import { EncdecService } from '../../core/services/encdec.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private encdecService = inject(EncdecService);
  
  constructor() {}
  
  setSession(key: string, value: any) {
    const valueString = JSON.stringify(value);
    const enc = this.encdecService.encrypt(valueString);
    sessionStorage.setItem(key, enc);
  }
  
  getSession(key: string) {
    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) {
      return null;
    }
    
    try {
      const decryptedValue = this.encdecService.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch (error) {
      console.error('Error al desencriptar/parsear la sesión:', error);
      this.removeSession(key); // Elimina datos de sesión inválidos
      return null;
    }
  }
  
  clearSession() {
    sessionStorage.clear();
  }
  
  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }
  
  hasSession(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
}