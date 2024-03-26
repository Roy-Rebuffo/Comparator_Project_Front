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
  filterProducts(category: string, event: any): void {
    if (event.target.checked) {
      this.filteredProducts = this.resultados.filter(product => product.title.includes(category));
    } else {
      this.filteredProducts = [...this.resultados];
    }
  }
  
  selectedPriceRanges: { min: number, max: number }[] = [];
  
  filterProductsByPrice(min: number, max: number, event: any): void {
    const range = { min, max };
    if (event.target.checked) {
      this.selectedPriceRanges.push(range);
    } else {
      this.selectedPriceRanges = this.selectedPriceRanges.filter(r => r.min !== min || r.max !== max);
    }
    if (this.selectedPriceRanges.length > 0) {
      this.filteredProducts = this.resultados.filter(product =>
        this.selectedPriceRanges.some(range => product.price >= range.min && product.price <= range.max)
      );
    } else {
      this.filteredProducts = [...this.resultados];
    }
  }
  
  checkbox0to5 = false;
  checkbox5to10 = false;
  
  // ...
  
  resetFilters(): void {
  this.selectedPriceRanges = [];
  this.filteredProducts = [...this.resultados];
  this.checkbox0to5 = false;
  this.checkbox5to10 = false;
  // Haz lo mismo para todas las demás casillas de verificación
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

}
