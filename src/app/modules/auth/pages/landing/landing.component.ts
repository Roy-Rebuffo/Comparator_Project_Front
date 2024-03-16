import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
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
                this.router.navigate([''])
            }

        },
        error: (error) => {
          console.log(error)
        }
      })
    }
}
