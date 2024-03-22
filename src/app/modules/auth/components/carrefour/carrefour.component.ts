import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-carrefour',
  templateUrl: './carrefour.component.html',
  styleUrls: ['./carrefour.component.scss']
})
export class CarrefourComponent {
  datos: any[] = [];
  resultados: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtenerCarrefour().subscribe((data: any) => {
      this.resultados = data;
    });
  }
}
