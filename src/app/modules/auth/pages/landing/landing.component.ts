import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  showPassword: boolean = false;
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  messageLogin: string = "";
  messageRegister: string = "";
  status: 'loading' | 'unauthorized' | 'success' | 'disabled' | 'error' = 'disabled';
  isSignUpMode: boolean = false;
  isSignUpMode2: boolean = false;
  carrefour: Product[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService, private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getDataCarrefour();
  }

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
            const userData = {
              _id: response._id,
              name: response.name,
              email: response.email,
              surname: response.surname
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            this.router.navigate(['home']);
            console.log(response);
            
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    } else {
      this.status = 'error';
      this.messageLogin = 'El formulario es inválido, recuerda que la contraseña debe tener de 8 a 12 caracteres y debe incluir al menos un caracter en mayúscula, uno en minúscula, un número y un carácter especial';
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
        this.messageRegister = response.msg;
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
        this.status = 'unauthorized';
        this.messageRegister = error.error;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getDataCarrefour() {
    this.productService.getCarrefour().subscribe({
      next: (data: any) => {
        this.carrefour = data;
        localStorage.setItem("carrefour", JSON.stringify(data));
        console.log("Datos de Carrefour cargados correctamente");
        this.checkLoadingState();
      },
      error: (error) => {
        console.error("Error al cargar datos de Carrefour:", error);
      }
    });
  }

  checkLoadingState() {
    if (this.carrefour.length > 0 ) {
      this.isLoading = false; 
    }
  }
  

}
