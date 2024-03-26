import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-carrefour',
  templateUrl: './carrefour.component.html',
  styleUrls: ['./carrefour.component.scss']
})
export class CarrefourComponent {
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

  }
}
