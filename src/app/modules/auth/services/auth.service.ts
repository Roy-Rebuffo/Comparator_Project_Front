import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post('https://angular-back-final-project.vercel.app/api/users/register', user)
  }
  confirmUser(token: string){
    return this.http.get(`https://angular-back-final-project.vercel.app/api/users/confirm-user/${token}`)
  }
  login(user: any) {
    return this.http.post('https://angular-back-final-project.vercel.app/api/users/login',user)
  }
  logout() {
    return this.http.get('https://angular-back-final-project.vercel.app/api/users/logout')
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>('https://angular-back-final-project.vercel.app/api/users/is-admin')
  }


}
