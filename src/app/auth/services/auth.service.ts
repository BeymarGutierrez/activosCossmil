import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { Usuario } from '../models/Usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Params } from '../../core/models/Params';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private sessionService = inject(SessionService);

  constructor() {}

  auth(usr: Usuario): Observable<any> {
    console.log('Datos de usuario recibidos:', usr);

    const formData = new FormData();
    formData.append('username', usr.usuario);
    formData.append('password', usr.pwd);
    formData.append('grant_type', 'password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(Params.usrfe + ':' + Params.pwdfe),
    });

    console.log('Headers configurados:', headers);
    console.log('URL de autenticación:', Params.url_api + '/securityrh/oauthrh/token');

    /* cambio de en rh a sh para los servicios */
    return this.http.post(
      Params.url_api + '/securityrh/oauthrh/token',
      formData,
      { headers: headers }
    );
  }

  logOut() {
    console.log('cerrando sesion');
    this.sessionService.clearSession();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.sessionService.getSession('user') !== null;
  }
}
