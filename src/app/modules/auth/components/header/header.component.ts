import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  query: string = '';
  resultados: any[] = [];
  datos: any[] = [];
  dataAhorramas: any[] = [];
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.obtener().subscribe((data: any) => {
      this.datos = data;
    });
  }

  buscar(event:any) {

    this.router.navigate(['/results',this.query])
  }

  logout() {
    
    sessionStorage.removeItem('token-app');

    this.router.navigate(['/landing']);
  }
}
