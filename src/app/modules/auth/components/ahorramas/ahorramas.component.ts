import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-ahorramas',
  templateUrl: './ahorramas.component.html',
  styleUrls: ['./ahorramas.component.scss']
})
export class AhorramasComponent {
  resultados: any[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtenerAhorramas().subscribe((data: any) => {
      this.resultados = data;
    });
  }
}
