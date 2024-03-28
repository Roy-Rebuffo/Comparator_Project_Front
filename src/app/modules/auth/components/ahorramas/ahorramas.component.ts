import { SearchResultsComponent } from './../search-results/search-results.component';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorramas',
  templateUrl: './ahorramas.component.html',
  styleUrls: ['./ahorramas.component.scss']
})
export class AhorramasComponent {
  resultados: any[] = [];
  filteredProducts: any[] = []; // Declare the 'filteredProducts' property

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtenerAhorramas().subscribe((data: any) => {
      this.resultados = data;
      this.filteredProducts = [...this.resultados];
      console.log(this.resultados);
    });
  }
  compareProduct(title: string): void {
    // Redirigir a la ruta /comparator y pasar el título del producto como parámetro
    this.router.navigate(['/comparator'], { queryParams: { title: title } })
  }

  addToFavorites(title: string, image: string, price:number) {
    const favoritesFromLocal = JSON.parse(localStorage.getItem('favoritos') || '[]');

    console.log(favoritesFromLocal);

    const existingTitleIndex = favoritesFromLocal.findIndex((prodFav: any) => prodFav.title === title && prodFav.image === image && prodFav.price === price);

    if (existingTitleIndex === -1) {
        // El producto no está en favoritos, así que lo agregamos
        favoritesFromLocal.push({ title: title, price: price,image: image }); // Agregamos el producto como un objeto con su título
    } else {
        // El producto ya está en favoritos, así que lo eliminamos
        favoritesFromLocal.splice(existingTitleIndex, 1);
    }

    // Actualizamos la lista de favoritos en el almacenamiento local
    localStorage.setItem('favoritos', JSON.stringify(favoritesFromLocal));

}

  isFavorite(productTitle: string): boolean {
  const favoritesFromLocal = JSON.parse(localStorage.getItem('favoritos')!);
  return favoritesFromLocal.some((prodFav: any) => prodFav.title === productTitle);
}

checkboxChmapu = false;
checkboxDesodorante = false;

filterProducts(category: string, event: any): void {
  if (event.target.checked) {
    if (this.checkboxChmapu && this.checkboxDesodorante) {
      // Si ambas casillas de verificación están marcadas, mostrar todos los productos
      this.filteredProducts = [...this.resultados];
    } else {
      // Si solo una casilla de verificación está marcada, filtrar los productos por categoría
      this.filteredProducts = this.resultados.filter(product => product.title.includes(category));
    }
  } else {
    if (this.checkboxChmapu) {
      // Si se desmarca la casilla de verificación Desodorante, mostrar solo los productos de la categoría Chmapu
      this.filteredProducts = this.resultados.filter(product => product.title.includes('Champú'));
    } else if (this.checkboxDesodorante) {
      // Si se desmarca la casilla de verificación Chmapu, mostrar solo los productos de la categoría Desodorante
      this.filteredProducts = this.resultados.filter(product => product.title.includes('Desodorante'));
    } else {
      // Si ambas casillas de verificación están desmarcadas, no mostrar ningún producto
      this.filteredProducts = [...this.resultados];
    }
  }
}

filterProductsByPrice(min: number, max: number, event: any ): void {
  if (event.target.checked) {
    if (this.checkbox0to5 && this.checkbox5to20) {
      // Si ambas casillas de verificación están marcadas, mostrar todos los productos
      this.filteredProducts = [...this.resultados];
    } else {
      // Si solo una casilla de verificación está marcada, filtrar los productos por categoría
      this.filteredProducts = this.resultados.filter(product => product.price >= min && product.price <= max);
    }
  } else {
    if (this.checkbox0to5) {
      // Si se desmarca la casilla de verificación Desodorante, mostrar solo los productos de la categoría Chmapu
      this.filteredProducts = this.resultados.filter(product => product.price >= min && product.price <= max);
    } else if (this.checkbox5to20) {
      // Si se desmarca la casilla de verificación Chmapu, mostrar solo los productos de la categoría Desodorante
      this.filteredProducts = this.resultados.filter(product => product.price >= min && product.price <= max);
    } else {
      // Si ambas casillas de verificación están desmarcadas, no mostrar ningún producto
      this.filteredProducts = [...this.resultados];
    }
  }
}



checkbox0to5 = false;
checkbox5to20 = false;


// ...

resetFilters(): void {
this.filteredProducts = [...this.resultados];
this.checkbox0to5 = false;
this.checkbox5to20 = false;
this.checkboxChmapu = false;
this.checkboxDesodorante = false;
// Haz lo mismo para todas las demás casillas de verificación
}

}

