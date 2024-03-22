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
    // Crea una expresión regular con el título de los productos a comparar
    const regex = new RegExp(this.title.split(" ").join("|"), "i");// "i" para hacer la búsqueda insensible a mayúsculas y minúsculas

    // Encuentra el primer producto que coincide con el título buscado
    //const compareProduct = this.products.find(producto => regex.test(producto.title.split(" ")));
   let conteo = 0;
    for (let product of this.products){
      for (let palabra of product.title.split(" ")){
        let regex = new RegExp("\b" + palabra + "\b", "i"); // \b indica límites de palabra
        if (regex.test(product)) {
            conteo++;
           if(conteo === 2) {
            this.compareProduct = product;
            break

        }}

      }
  }

    // Imprime los resultados para depuración
    console.log(this.compareProduct);
    console.log(this.productsToCompare);

    // // Verifica si se encontró un producto para comparar y si es diferente al producto actualmente comparado
    // if (compareProduct && compareProduct !== this.productsToCompare) {
    //   this.compareProduct = compareProduct;
    // }
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
