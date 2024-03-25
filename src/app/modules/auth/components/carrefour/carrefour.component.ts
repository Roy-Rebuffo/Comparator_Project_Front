import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-carrefour',
  templateUrl: './carrefour.component.html',
  styleUrls: ['./carrefour.component.scss']
})
export class CarrefourComponent {
  resultados: any[] = [];
  filteredProducts: any[] = [];


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtenerAhorramas().subscribe((data: any) => {
      this.resultados = data;
      console.log(this.resultados);  // para depurar
      this.filterProductsCategory('Champus');  // mover la llamada a filterProductsCategory aquí
    });
  }
  
  filterProductsCategory(category: string): void {
    this.filteredProducts = this.resultados.filter(product => 
      product.category && product.category.trim().toLowerCase() === category.trim().toLowerCase()
    );
    console.log(this.filteredProducts);  // para depurar
  }

  filterProductsPrice(price: number): void {
    this.resultados = this.resultados.filter((product) => {
      return product.price === price;
    });
  }
}
