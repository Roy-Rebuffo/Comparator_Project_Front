import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
email: string = ""
password: string = ""

constructor(private authService: AuthService, private router: Router){}

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
            sessionStorage.setItem('token-app', JSON.stringify(response.token))
              this.router.navigate(['products'])
          }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
