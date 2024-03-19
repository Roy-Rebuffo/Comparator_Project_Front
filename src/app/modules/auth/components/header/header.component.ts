
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  query: string = '';
  resultados: any[] = [];
  datos: any[] = [];

  constructor(private authservice: AuthService, private router: Router) { } 

  ngOnInit(): void {
    this.authservice.obtenerDatos().subscribe((data: any) => { 
      this.datos = data; 
    });
  }   

  buscar(event:any) {
    this.resultados = this.datos.filter(item => item.price && item.image && item.title.toLowerCase().includes(this.query.toLowerCase()));
    console.log('Resultados:', this.resultados); // Imprime los resultados
    this.authservice.setInputValue(this.query);
    this.router.navigate(['/results'], { state: { resultados: this.resultados, query: this.query } });
  }
}