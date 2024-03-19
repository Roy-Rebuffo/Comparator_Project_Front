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
  // comparator(){
  //   let resultadosComparacion = []
  //   for(let resultado of this.resultados){
  //     let product = resultado.find((item:any) => item.title.toLowerCase()===this.query.toLowerCase());
  //     if(product){
  //       resultadosComparacion.push(product)
  //     }
  //   }

  //   this.router.navigate(['/comparator'],{ state:{resultados:resultadosComparacion, query:this.query}});
  //   console.log(resultadosComparacion);

  // }
}
