import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  resultados: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  onInput(event: any): void {
    const inputValue = event.target.value;
    this.buscar(inputValue);
  }

  buscar(query: string): void {
    this.authService.searchData(query).subscribe(data => { // Pass the query parameter to the searchData() method
      console.log(data);
      this.resultados = data.filter((item: any) => item && item.nombre && item.nombre.includes(query));
      this.router.navigate(['/resultados']);
    });
  }
}