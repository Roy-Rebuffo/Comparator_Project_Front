import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  datos: any[] = [];   
  resultados: any[] = [];    
  constructor(private authsevice: AuthService) {}    
  ngOnInit() {     
    this.authsevice.searchData().subscribe((data:any) => {
             this.datos = data;     });   }    
    onInput(event: any) {   const query = event?.target?.value || '';   this.buscar(query); }
    buscar(query: string) {     
      this.resultados = this.datos.filter(item =>item.toLowerCase().includes(query.toLowerCase()));   
    }
}