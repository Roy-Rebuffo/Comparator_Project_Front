import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  resultados: any[] = [];
  query: string = '';

  constructor(private router: Router, private authservice: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.query = this.authservice.getInputValue(); // Obtener el valor del input desde el servicio
    this.cd.detectChanges();
    console.log(this.query);
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.resultados = navigation.extras.state['resultados'];
    }
  }

}
