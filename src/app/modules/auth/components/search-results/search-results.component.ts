import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  resultados: any[] = [];
  query: string = '';

  constructor(private router: Router, private route:ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
  this.route.params.subscribe(params=>{
    this.query = params["search"]
    this.productService.obtener().subscribe({
      next: (res:any) => {
            this.resultados = res.filter((item:any) => item.title.toLowerCase().includes(this.query.toLowerCase()));
            console.log(this.resultados);
          }

    })

  })
  }
  compareProduct(title: string): void {
    // Redirigir a la ruta /comparator y pasar el título del producto como parámetro
    this.router.navigate(['/comparator'], { queryParams: { title: title } })
  }

}
