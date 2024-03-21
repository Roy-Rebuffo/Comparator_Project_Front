import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-comparator',
  templateUrl: './comparator.component.html',
  styleUrls: ['./comparator.component.scss']
})
export class ComparatorComponent implements OnInit {
  title: string = '';
  products: any[] = [];
  productsToCompare: any = null;
  similarProducts: any[] = [];
  compareProduct: any = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.productService.obtenerDatos().subscribe((res: any[]) => {
        this.products = res;
        this.findSimilarProducts();
        this.findCompareProduct();
      });
    });
  } 

  findSimilarProducts(): void {
    this.productsToCompare = this.products.find(producto => producto.title.toLowerCase() === this.title.toLowerCase());
    if (this.productsToCompare) {
      this.similarProducts = this.products.filter(producto => producto.title.toLowerCase() !== this.title.toLowerCase())
      .slice(0, 5); 
    }
  }

  findCompareProduct(): void {
    const compareProduct = this.products.find(producto => producto.title.toLowerCase().includes(this.title.toLowerCase()));
    console.log(compareProduct);
    console.log(this.productsToCompare);
    
    if (compareProduct && compareProduct !== this.productsToCompare) {

      this.compareProduct = compareProduct;
    }
  }

  precioMenor(producto: any): string {
    const comparePrice = this.products.find(prod => prod.title.toLowerCase() === this.title.toLowerCase()).price;
    if (producto.price < comparePrice) {
      return 'green'; 
    } else if (producto.price === comparePrice) {
      return 'black'; 
    } else {
      return 'red'; 
    }
  }
  
}
