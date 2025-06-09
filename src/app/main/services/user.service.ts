import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '../../core/models/Params';
import { SessionService } from '../../auth/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private sessionService = inject(SessionService);

  userArea = signal<string>('');
  userName = signal<string>('');
  userRole = signal<string>('');

  constructor() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    const userSession = this.sessionService.getSession('user');
    if (userSession) {
      this.userArea.set(
        'DIRECCIÓN NACIONAL DE TECNOLOGIAS DE INFORMACION Y COMUNICACION'
      );
      this.userName.set('DINATIC DIR. DTIC');
      this.userRole.set('OPERADOR RRHH');
    }
  }

  updateUserInfo() {
    this.loadUserInfo();
  }
}
