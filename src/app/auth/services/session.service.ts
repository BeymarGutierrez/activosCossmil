import { inject, Injectable } from '@angular/core';
import { EncdecService } from '../../core/services/encdec.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private encdecService = inject(EncdecService);

  constructor() {}

  setSession(key: string, value: any) {
    console.log('Valor a guardar:', value);

    const valueString = JSON.stringify(value);
    const enc = this.encdecService.encrypt(valueString);
    sessionStorage.setItem(key, enc);

    console.log('Sesión guardada exitosamente');
  }

  getSession(key: string) {
    console.log('Obteniendo sesión - Key:', key);

    const encryptedValue = sessionStorage.getItem(key);
    if (!encryptedValue) {
      console.log('No se encontró sesión para la key:', key);
      return null;
    }

    try {
      const decryptedValue = this.encdecService.decrypt(encryptedValue);
      const parsedValue = JSON.parse(decryptedValue);
      console.log('Sesión obtenida exitosamente:', parsedValue);
      return parsedValue;
    } catch (error) {
      console.error('Error al desencriptar/parsear la sesión:', error);
      this.removeSession(key);
      return null;
    }
  }

  clearSession() {
    console.log('Limpiando todas las sesiones');
    sessionStorage.clear();
    console.log('Sesiones limpiadas exitosamente');
  }

  removeSession(key: string) {
    console.log('Eliminando sesión - Key:', key);
    sessionStorage.removeItem(key);
    console.log('Sesión eliminada exitosamente');
  }

  hasSession(key: string): boolean {
    const hasSession = sessionStorage.getItem(key) !== null;
    console.log('Verificando sesión - Key:', key, '- Existe:', hasSession);
    return hasSession;
  }
}
