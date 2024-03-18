import { catchError } from 'rxjs';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  carrefour: Product[] = [];
  ahorramas: Product[] = [];
 
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCarrefour().subscribe((data: any) => {
      this.carrefour = data;
      this.mostrarProductosAleatorios();
    });

    this.authService.getAhorramas().subscribe((data: any) => {
      this.ahorramas = data;
      this.mostrarProductosAleatoriosAhorraMas();
    });
  }

  mostrarProductosAleatorios() {
    const totalProductos = this.carrefour.length;
    const indicesAleatorios: number[] = [];
    
    // Generar 10 índices aleatorios únicos
    while (indicesAleatorios.length < 10) {
      const indiceAleatorio = Math.floor(Math.random() * totalProductos);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Obtener los productos aleatorios
    this.carrefour = indicesAleatorios.map(indice => this.carrefour[indice]);
  }

  mostrarProductosAleatoriosAhorraMas() {
    const totalProductos = this.ahorramas.length;
    const indicesAleatorios: number[] = [];
    
    // Generar 10 índices aleatorios únicos
    while (indicesAleatorios.length < 10) {
      const indiceAleatorio = Math.floor(Math.random() * totalProductos);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Obtener los productos aleatorios
    this.ahorramas = indicesAleatorios.map(indice => this.ahorramas[indice]);
  }
}
