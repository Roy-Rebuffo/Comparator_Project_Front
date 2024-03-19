
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  query: string = '';
  resultados: any[] = [];
  datos: any[] = [];

  constructor(private authservice: AuthService ) { } // Inyecta tu servicio

  ngOnInit(): void {
    this.authservice.obtenerDatos().subscribe((data: any) => { 
      this.datos = data; 
    });
  }   

  buscar() {
    this.resultados = this.datos.filter(item => item.price && item.image && item.title.toLowerCase().includes(this.query.toLowerCase()));
    console.log('Resultados:', this.resultados); // Imprime los resultados
  }
}