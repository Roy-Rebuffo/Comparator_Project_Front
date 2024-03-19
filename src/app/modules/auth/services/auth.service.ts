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

  getCarrefour(){
    return this.http.get('http://localhost:8084/scrapedatacarrefour');
  }
  getAhorramas(){
    return this.http.get('http://localhost:8084/scrapedataahorramas');
  }
  obtenerDatos(): Observable<any[]> {
    const url1 = this.http.get('http://localhost:8084/scrapedatacarrefour');
    const url2 = this.http.get('http://localhost:8084/scrapedataahorramas');

    // Utiliza forkJoin para combinar las dos solicitudes HTTP y mapea los resultados para obtener un solo array
    return forkJoin([url1, url2]).pipe(
      map((results: any[]) => {
        return results.reduce((acc, curr) => acc.concat(curr), []); // Concatena los resultados en un solo array
      })
    );
  }

  setInputValue(value: string) {
    this.inputValue = value;
  }

  getInputValue() {
    return this.inputValue;
  }
}

// obtenerDatosDeVariasFuentes(): Observable<any> {
//   const url1 = this.http.get('http://url1.com/datos');
//   const url2 = this.http.get('http://url2.com/datos');

//   // Combina las solicitudes HTTP usando forkJoin
//   return forkJoin([url1, url2]);
