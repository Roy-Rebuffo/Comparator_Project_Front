import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.obtenerDatos().subscribe((data: any) => {
      this.datos = data;
    });
  }

  buscar(event:any) {
    this.resultados = this.datos.filter(item => item.price && item.image && item.title.toLowerCase().includes(this.query.toLowerCase()));
    console.log('Resultados:', this.resultados); // Imprime los resultados
    this.authService.setInputValue(this.query);
    this.router.navigate(['/results'], { state: { resultados: this.resultados, query: this.query } });
  }

  comparator(){

     let ahorramas = localStorage.getItem("ahorramas");

     if (ahorramas) {
       this.dataAhorramas = JSON.parse(ahorramas);
     } 

     //1. Obtener el nombre del producto a comparar (el que has pichado)
     //2. Buscar el nombre en el array del ahorramas con un find.
     //3. Cuando lo encuentre comparar los precios y dar un mensaje de compralo...

    // const titulosUnicos = new Set<string>(); // Utilizamos un Set para almacenar los títulos únicos
    // this.resultados.forEach(producto => {
    //   if (!titulosUnicos.has(producto.titulo)) {
    //     titulosUnicos.add(producto.titulo);
    //   } else {
    //     const precioActual = producto.precio;
    //     const productoAnterior = this.resultados.find(p => p.titulo === producto.titulo && p.precio < precioActual);
    //     if (productoAnterior) {
    //       productoAnterior.precio < producto.precio ? productoAnterior.color = 'green' : producto.color = 'green';
    //     }
        
    //   }
      
    // });
    
  }
}
