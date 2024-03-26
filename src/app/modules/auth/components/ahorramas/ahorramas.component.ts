import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ahorramas',
  templateUrl: './ahorramas.component.html',
  styleUrls: ['./ahorramas.component.scss']
})
export class AhorramasComponent {
  resultados: any[] = [];
  filteredProducts: any[] = []; // Declare the 'filteredProducts' property

  constructor(private productService: ProductService) { }

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



  selectedPriceRanges: { min: string, max: string }[] = [];

  filterProductsByPrice(min: string, max: string, event: any): void {
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

// ...

resetFilters(): void {
  this.selectedPriceRanges = [];
  this.filteredProducts = [...this.resultados];
  this.checkbox0to5 = false;
  // Haz lo mismo para todas las demás casillas de verificación
}

}
