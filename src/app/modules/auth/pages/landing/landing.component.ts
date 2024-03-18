import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  name: string = ""
  surname: string = ""
  email: string = ""
  password: string = ""
  isSignUpMode: boolean = false;
  isSignUpMode2: boolean = false;
  constructor(private authService: AuthService, private router: Router){}

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
    }
      this.authService.login(userObject).subscribe({
        next: (response: any) => {
            if(response){
              localStorage.setItem('token-app', JSON.stringify(response.token))
                this.router.navigate([''])
            }

        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    handleRegister() {
      // Validaciones para el registro, si es necesario
      const regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;

      // Crear un objeto con los datos del usuario para el registro
      const userObject = {
        name: this.name,
        surname: this.surname,
        email: this.email, // Puedes tomar el email desde el atributo de clase
        password: this.password // Y también la contraseña
        // Puedes agregar otros campos del formulario si es necesario
      };

      // Llamar al método de registro del servicio de autenticación
      this.authService.register(userObject).subscribe({
        next: (response: any) => {
          // Manejar la respuesta del servidor después del registro
          if (response) {
            // Si el registro es exitoso, redirigir al usuario a alguna página
            localStorage.setItem('token-app', JSON.stringify(response.token));
            this.router.navigate(['']); // Redirigir a la página principal, por ejemplo
          }
        },
        error: (error) => {
          // Manejar errores en caso de que el registro falle
          console.log(error);
        }
      });
    }


}
