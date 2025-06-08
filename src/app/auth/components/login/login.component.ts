import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/Usuario';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // inyeccion de dependecias
  private router = inject(Router);
  private authService = inject(AuthService);
  private sessionService = inject(SessionService);

  credentials = signal<Usuario>({
    usuario: '',
    pwd: '',
  });
  showPassword = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  togglePassword() {
    this.showPassword.update((value) => !value);
  }

  iniciarSesion() {
    if (this.validateForm()) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.authService.auth(this.credentials()).subscribe({
        next: (response) => {
          if (response && response.access_token) {
            this.sessionService.setSession('user', response);
            console.log(this.credentials());
            this.router.navigate(['/main']);
          } else {
            this.errorMessage.set('Respuesta inválida del servidor');
          }
        },
        error: (error) => {
          this.errorMessage.set(this.handleError(error));
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }

  private validateForm(): boolean {
    const { usuario, pwd } = this.credentials();

    if (!usuario || usuario.trim() === '') {
      this.errorMessage.set('El nombre de usuario es requerido');
      return false;
    }

    if (!pwd || pwd.trim() === '') {
      this.errorMessage.set('La contraseña es requerida');
      return false;
    }

    return true;
  }

  private handleError(error: any): string {
    if (error.status === 401) return 'Credenciales Incorrectas';
    if (error.status === 0) return 'Error de conexion con el servidor';
    return error.message || 'Error Desconocido';
  }
}
// public usr = new Usuario('', '');
// public submitted = false;
// public showPassword = false;
// public isLoading = false;
// public errorMessage = '';

// ngOnInit() {
//   this.sessionService.removeSession('user');
//   this.usr.usuario = 'acorich';
//   this.usr.pwd = '123*';
// }

// ingresar() {
//   this.router.navigate(['/main']);
// }

// togglePassword() {
//   this.showPassword = !this.showPassword;
// }

// iniciarSesion() {
//   this.submitted = true;
//   this.isLoading = true;
//   this.errorMessage = '';
//   console.log(this.usr);

//   if (!this.usr.usuario || !this.usr.pwd) {
//     this.isLoading = false;
//     return;
//   }

//   this.authService.auth(this.usr).subscribe({
//     next: (response: any) => {
//       if(response){

//         this.sessionService.setSession('user',response)
//         }
//         this.isLoading = false
//     },
//     error: (error) => {
//       this.errorMessage = error.message || 'DATOS INCORRECTOS';
//       this.isLoading = false
//     }
// })

// this.authService.auth(this.usr).subscribe(
//   (response: any) => {
//     if (response) {
//       this.sessionService.setSession('user', response);
//       this.ingresar();
//     }
//   },
//   (error) => {
//     alert('DATOS INCORRECTOS');
//   }
// );
