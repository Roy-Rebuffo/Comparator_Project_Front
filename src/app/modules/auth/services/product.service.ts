import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dataAhorramas: any [] = [];
  private dataCarrefour: any [] = [];
  private inputValue: string = '';
  private resultadosSubject = new BehaviorSubject<any[]>([]);
  resultados$ = this.resultadosSubject.asObservable();

  constructor(private http: HttpClient) { }


  getCarrefour(){
    return this.http.get('http://localhost:8084/scrapedatacarrefour');
  }
  getAhorramas(){
    return this.http.get('http://localhost:8084/scrapedataahorramas');
  }


  obtener(): Observable<any[]> {
    let ahorramas = localStorage.getItem("ahorramas");
    let carrefour = localStorage.getItem("carrefour");

    if (ahorramas) {
      this.dataAhorramas = JSON.parse(ahorramas);
    }
    if (carrefour) {
      this.dataCarrefour = JSON.parse(carrefour);
    }

    let results = this.dataCarrefour.concat(this.dataAhorramas);
    console.log(results);

    // Devuelve un observable que emite el resultado
    return of(results);
  }

  obtenerAhorramas(): Observable<any[]> {
    let ahorramas = localStorage.getItem("ahorramas");
    if (ahorramas) {
      this.dataAhorramas = JSON.parse(ahorramas);
    }
    // Devuelve un observable que emite los datos de ahorramas
    return of(this.dataAhorramas);
  }

  // Obtener datos de carrefour
  obtenerCarrefour(): Observable<any[]> {
    let carrefour = localStorage.getItem("carrefour");
    if (carrefour) {
      this.dataCarrefour = JSON.parse(carrefour);
    }
    // Devuelve un observable que emite los datos de carrefour
    return of(this.dataCarrefour);
  }

}
