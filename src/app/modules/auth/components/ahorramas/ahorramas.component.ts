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
checkbox2to4 = false;
checkbox4to6 = false;
checkbox6to8 = false;
checkbox8to10 = false; 
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
checkboxPepsi = false;
checkbox10to15  = false;
checkboxMas20 = false;


removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
filterProducts(min: number, max: number, event: any): void {
  // Inicializar filteredProducts con todos los productos
  this.filteredProducts = [...this.resultados];

  // Aplicar filtro de categoría si las casillas de verificación correspondientes están marcadas
  if (this.checkboxEnergeticas || this.checkboxCola || this.checkboxZero || this.checkboxLight || this.checkboxTonica || this.checkboxGaseosa || this.checkboxIsotonico) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      let inCategory = false;
      if (product.title) {
        const titleWithoutAccents = this.removeAccents(product.title.toLowerCase());
        inCategory = (this.checkboxEnergeticas && (titleWithoutAccents.includes(this.removeAccents('Red Bull').toLowerCase()) || titleWithoutAccents.includes(this.removeAccents('Burn').toLowerCase()))) || (this.checkboxCola && titleWithoutAccents.includes(this.removeAccents('Cola').toLowerCase())) || (this.checkboxZero && titleWithoutAccents.includes(this.removeAccents('Zero').toLowerCase())) || (this.checkboxLight && titleWithoutAccents.includes(this.removeAccents('Light').toLowerCase())) || (this.checkboxTonica && titleWithoutAccents.includes(this.removeAccents('Tónica').toLowerCase())) || (this.checkboxGaseosa && titleWithoutAccents.includes(this.removeAccents('Gaseosa').toLowerCase())) || (this.checkboxIsotonico && titleWithoutAccents.includes(this.removeAccents('Isotónica').toLowerCase()));
      }
      return inCategory;
    });
  }


  // Aplicar filtro de precio si las casillas de verificación correspondientes están marcadas
  if (this.checkbox0to2 || this.checkbox2to4 || this.checkbox4to6 || this.checkbox6to8 || this.checkbox8to10) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      const price = parseFloat(product.price.replace(',', '.').replace('€', ''));
      const inRange = (this.checkbox0to2 && price >= 0 && price <= 2) || (this.checkbox2to4 && price >= 2 && price <= 5) || (this.checkbox4to6 && price >= 4 && price <= 6) || (this.checkbox6to8 && price >= 6 && price <= 8) || (this.checkbox8to10 && price >= 8 && price <= 10);
      return inRange;
    });
  }

  if (this.checkboxAquarius || this.checkboxCocaCola || this.checkboxFanta || this.checkboxMonster || this.checkboxBurn || this.checkboxNestea || this.checkboxPowerade || this.checkboxRedBull || this.checkboxSchweppes || this.checkboxPepsi) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      let inBrand = false;
      if (product.title) {
        inBrand = (this.checkboxAquarius && product.title.includes('Aquarius')) || (this.checkboxCocaCola && product.title.includes('Coca Cola')) || (this.checkboxFanta && product.title.includes('Fanta')) || (this.checkboxMonster && product.title.includes('Monster')) || (this.checkboxBurn && product.title.includes('Burn')) || (this.checkboxNestea && product.title.includes('Nestea')) || (this.checkboxPowerade && product.title.includes('Powerade')) || (this.checkboxRedBull && product.title.includes('Red Bull')) || (this.checkboxSchweppes && product.title.includes('Schweppes')) || (this.checkboxPepsi && product.title.includes('Pepsi'));
      }
      return inBrand;
    });
  }
  if (this.checkboxLata || this.checkboxBotella || this.checkboxSobre) {
    this.filteredProducts = this.filteredProducts.filter(product => {
      let inFormat = false;
      if (product.title) {
        const lowerCaseTitle = product.title.toLowerCase();
        inFormat = (this.checkboxLata && lowerCaseTitle.includes('lata')) || (this.checkboxBotella && lowerCaseTitle.includes('botella')) || (this.checkboxSobre && lowerCaseTitle.includes('sobre'));
      }
      return inFormat;
    });
  }
}


resetFilters(): void {
this.filteredProducts = [...this.resultados];
this.checkbox0to2 = false;
this.checkbox2to4 = false;
this.checkbox4to6 = false;
this.checkbox6to8 = false;
this.checkbox8to10 = false; 
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
this.checkboxPepsi = false;

}
}