import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrefour',
  templateUrl: './carrefour.component.html',
  styleUrls: ['./carrefour.component.scss']
})
export class CarrefourComponent {
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

checkbox0to5 = false;
checkbox5to20 = false;
checkboxChmapu = false;
checkboxDesodorante = false;


filterProducts(min: number, max: number, event: any): void {
  // Inicializar filteredProducts con todos los productos
  this.filteredProducts = [...this.resultados];

  // Aplicar filtro de categoría si las casillas de verificación correspondientes están marcadas
  if (this.checkboxChmapu || this.checkboxDesodorante) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      const inCategory = (this.checkboxChmapu && product.title.includes('Champú')) || (this.checkboxDesodorante && product.title.includes('Desodorante'));
      return inCategory;
    });
  }

  // Aplicar filtro de precio si las casillas de verificación correspondientes están marcadas
  if (this.checkbox0to5 || this.checkbox5to20) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      const price = parseFloat(product.price.replace(',', '.').replace('€', ''));
      const inRange = (this.checkbox0to5 && price >= 0 && price <= 5) || (this.checkbox5to20 && price >= 5 && price <= 20);
      return inRange;
    });
  }
}


resetFilters(): void {
this.filteredProducts = [...this.resultados];
this.checkbox0to5 = false;
this.checkbox5to20 = false;
this.checkboxChmapu = false;
this.checkboxDesodorante = false;
// Haz lo mismo para todas las demás casillas de verificación
}

}


