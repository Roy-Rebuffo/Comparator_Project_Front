import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  email: string = "";
  password: string = "";
  isSignUpMode: boolean = false;
  isSignUpMode2: boolean = false;
  message: string = "";
  status: 'loading' | 'unauthorized' | 'success' | 'disabled' = 'disabled';
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
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
    const { email, password } = this.registerForm.value;
    const userObject = { email, password };

    this.authService.login(userObject).subscribe({
      next: (response: any) => {
        if (response) {
          sessionStorage.setItem('token-app', JSON.stringify(response.token));
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleRegister() {
    this.status = 'loading';
    if (this.registerForm.valid) {
      const { name, surname, email, password } = this.registerForm.value;
      const objectToSend = { name, surname, email, password };

      this.authService.register(objectToSend).subscribe({
        next: (response: any) => {
          this.status = 'success';
          this.message = response.msg;
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
          this.status = 'unauthorized';
          this.message = error.error.msg;
        }
      });
      this.registerForm.reset();
    }
  }
}
