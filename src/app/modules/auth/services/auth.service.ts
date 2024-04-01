import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/User.interface';

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
    return this.http.get(`http://localhost:8084/api/users/confirm-user/${token}`)
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

  getProfile(userObject: any): Observable<any> {
    return this.http.get<any>('http://localhost:8084/api/users/getprofile', { params: userObject });
  }

//   editUser(id: string, userToEdit: FormData){
//     return this.http.patch<User>('http://localhost:8084/api/users/edit/:id', userToEdit)
//   }

editUser(id: string, userData: any ): Observable<User> {
  // Utiliza comillas invertidas para incluir dinámicamente el ID en la URL
  const url = `http://localhost:8084/api/users/edit/${id}`;

  // Realiza la solicitud PATCH con la URL actualizada y los datos del usuario a editar
  return this.http.patch<User>(url, userData);
}

deleteUser(id: any){
  return this.http.delete(`http://localhost:8084/api/users/delete/${id}`)
}

 }

