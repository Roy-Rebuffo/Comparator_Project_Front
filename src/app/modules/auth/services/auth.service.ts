import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inputValue: string = '';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post('http://localhost:8084/api/users/register', user)
  }
  confirmUser(token: string){
    return this.http.get(`https://angular-back-final-project.vercel.app/api/users/confirm-user/${token}`)
  }
  login(user: any) {
    return this.http.post('http://localhost:8084/api/users/login',user)
  }
  logout() {
    return this.http.get('http://localhost:8084/api/users/logout')
  }

  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8084/api/users/is-admin');
  }
}


