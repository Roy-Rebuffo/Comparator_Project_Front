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
  supermarket: string = '';
  products: any[] = [];
  productsToCompare: any = null;
  similarProducts: any[] = [];
  compareProduct: any = null;
  resultados: any 

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.title = params['title'];
      this.productService.obtener().subscribe((res: any[]) => {
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
  console.log(this.productsToCompare);
  
  const stringsABuscar = this.productsToCompare.title.split(" ");
  console.log(stringsABuscar);
  
  const resultados = this.products.filter(objeto => {
    let count = 0;
    for (let palabras of stringsABuscar){
      if (objeto.title.includes(palabras)){
        count ++
      }
    }
    return count >= 5  
      // return stringsABuscar.every((string:any) => objeto.title.includes(string));
  });
  
  console.log(resultados);
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

  goToSuperMarket(product: any) {
    let url;
    if (product.supermarket === "carrefour") {
      url = 'https://www.carrefour.es/supermercado?ic_source=portal-y-corporativo&ic_medium=category-food-box&ic_content=ns';
    } else {
      url = 'https://www.ahorramas.com/';
    }

    // Abrir la URL en una nueva pestaña
    window.open(url, '_blank');
  }
}
