import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  message: string = "";
  status: 'loading' | 'unauthorized' | 'success' | 'disabled' | 'error' = 'disabled';
  isSignUpMode: boolean = false;
  isSignUpMode2: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSignIn() {
    this.isSignUpMode = false;
    this.isSignUpMode2 = false;
  }

  toggleSignUp() {
    this.isSignUpMode = true;
    this.isSignUpMode2 = true;
  }

  handleLogin() {
    const regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;
    const userObject = {
      email: this.email,
      password: this.password
    };

    if (regExpEmail.test(this.email) && regExpPassword.test(this.password)) {
      this.authService.login(userObject).subscribe({
        next: (response: any) => {
          if (response) {
            sessionStorage.setItem('token-app', JSON.stringify(response.token));
            this.router.navigate(['home']);
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.status = 'error';
      this.message = 'El formulario es inválido, recuerda que la contraseña debe tener de 8 a 12 caracteres y debe incluir al menos un caracter en mayúscula, uno en minúscula, un número y un carácter especial';
    }
  }

  handleRegister() {
    this.status = 'loading';
    const objectToSend = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };

    this.authService.register(objectToSend).subscribe({
      next: (response: any) => {
        this.status = 'success';
        this.message = response.msg;
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
        this.status = 'unauthorized';
        this.message = error.error.msg;
      }
    });
  }
}
