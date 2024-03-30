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
  filteredProducts: any[] = [];

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
  return favoritesFromLocal ? favoritesFromLocal.some((prodFav: any) => prodFav.title === productTitle) : false;
}

checkbox0to2 = false;
checkbox2to5 = false;
checkbox5to10 = false;
checkbox10to15 = false;
checkbox15to20 = false; 
checkboxMas20 = false;
checkboxRedBull =  false;
checkboxSchweppes=  false;
checkboxPowerade = false;
checkboxNestea = false;
checkboxAquarius = false;
checkboxCocaCola = false;
checkboxFanta = false;
checkboxMonster = false;
checkboxBurn = false;
checkboxSobre = false;
checkboxBotella = false;
checkboxLata = false;
checkboxZero = false;
checkboxLight = false;
checkboxTonica = false;
checkboxGaseosa = false;
checkboxIsotonico = false;
checkboxCola = false;
checkboxEnergeticas = false;




filterProducts(min: number, max: number, event: any): void {
  // Inicializar filteredProducts con todos los productos
  this.filteredProducts = [...this.resultados];

  // Aplicar filtro de categoría si las casillas de verificación correspondientes están marcadas
  if (this.checkboxEnergeticas || this.checkboxCola || this.checkboxZero || this.checkboxLight || this.checkboxTonica || this.checkboxGaseosa || this.checkboxIsotonico) {
    this.filteredProducts = this.resultados.filter(product => {
      let inCategory = false;
      if (product.title) {
        inCategory = (this.checkboxEnergeticas && product.title.includes('Energéticas')) || (this.checkboxCola && product.title.includes('Cola')) || (this.checkboxZero && product.title.includes('Zero')) || (this.checkboxLight && product.title.includes('Light')) || (this.checkboxTonica && product.title.includes('Tónica')) || (this.checkboxGaseosa && product.title.includes('Gaseosa')) || (this.checkboxIsotonico && product.title.includes('Isotónico'));
      }
      return inCategory;
    });
  }

  // Aplicar filtro de precio si las casillas de verificación correspondientes están marcadas
  if (this.checkbox0to2 || this.checkbox2to5 || this.checkbox5to10 || this.checkbox10to15 || this.checkbox15to20 || this.checkboxMas20) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      const price = parseFloat(product.price.replace(',', '.').replace('€', ''));
      const inRange = (this.checkbox0to2 && price >= 0 && price <= 2) || (this.checkbox2to5 && price >= 2 && price <= 5) || (this.checkbox5to10 && price >= 5 && price <= 10) || (this.checkbox10to15 && price >= 10 && price <= 15) || (this.checkbox15to20 && price >= 15 && price <= 20) || (this.checkboxMas20 && price > 20);
      return inRange;
    });
  }
}


resetFilters(): void {
this.filteredProducts = [...this.resultados];
this.checkbox0to2 = false;
this.checkbox2to5 = false;
this.checkbox5to10 = false;
this.checkbox10to15 = false;
this.checkbox15to20 = false; 
this.checkboxMas20 = false;
this.checkboxRedBull =  false;
this.checkboxSchweppes=  false;
this.checkboxPowerade = false;
this.checkboxNestea = false;
this.checkboxAquarius = false;
this.checkboxCocaCola = false;
this.checkboxFanta = false;
this.checkboxMonster = false;
this.checkboxBurn = false;
this.checkboxSobre = false;
this.checkboxBotella = false;
this.checkboxLata = false;
this.checkboxZero = false;
this.checkboxLight = false;
this.checkboxTonica = false;
this.checkboxGaseosa = false;
this.checkboxIsotonico = false;
this.checkboxCola = false;
this.checkboxEnergeticas = false;

// Haz lo mismo para todas las demás casillas de verificación
}

}