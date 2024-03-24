import { Component } from '@angular/core';
import { Product } from '../../interfaces/Product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  carrefour: Product[] = [];
  ahorramas: Product[] = [];
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCarrefour().subscribe((data: any) => {
      this.carrefour = data;
      localStorage.setItem("carrefour", JSON.stringify(data));
      this.mostrarProductosAleatorios();
      this.checkLoadingState();
    });

    this.productService.getAhorramas().subscribe((data: any) => {
      this.ahorramas = data;
      localStorage.setItem("ahorramas", JSON.stringify(data));
      this.mostrarProductosAleatoriosAhorraMas();
      this.checkLoadingState();
    });
  }

  mostrarProductosAleatorios() {
    const totalProductos = this.carrefour.length;
    const indicesAleatorios: number[] = [];

    // Generar 10 índices aleatorios únicos
    while (indicesAleatorios.length < 10) {
      const indiceAleatorio = Math.floor(Math.random() * totalProductos);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Obtener los productos aleatorios
    this.carrefour = indicesAleatorios.map(indice => this.carrefour[indice]);
  }

  mostrarProductosAleatoriosAhorraMas() {
    const totalProductos = this.ahorramas.length;
    const indicesAleatorios: number[] = [];

    // Generar 10 índices aleatorios únicos
    while (indicesAleatorios.length < 10) {
      const indiceAleatorio = Math.floor(Math.random() * totalProductos);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Obtener los productos aleatorios
    this.ahorramas = indicesAleatorios.map(indice => this.ahorramas[indice]);
  }
  checkLoadingState() {
    // Verificar si ambos conjuntos de datos han sido cargados
    if (this.carrefour.length > 0 && this.ahorramas.length > 0) {
      this.isLoading = false; // Cambiar el estado de isLoading cuando todos los datos estén disponibles
    }
  }

  goToAhorramas(){
    window.open('https://www.ahorramas.com/', '_blank');
  }
  goToCarrefour(){
    window.open('https://www.carrefour.es/supermercado?ic_source=portal-y-corporativo&ic_medium=category-food-box&ic_content=ns', '_blank');
  }
}
