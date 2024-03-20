import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private inputValue: string = '';

  constructor(private http: HttpClient) { }


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
}
