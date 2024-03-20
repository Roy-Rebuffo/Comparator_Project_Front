import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  resultados: any[] = [];
  query: string = '';

  constructor(private router: Router, private authservice: AuthService, private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.route.params.subscribe(params=>{
    this.query = params["search"]
    // this.authservice.getCarrefour().subscribe({
    //   next: (res:any) => {
    //     this.resultados = res.filter((item:any) => item.title.toLowerCase().includes(this.query.toLowerCase()));
    //     console.log(this.resultados);
        
    //   }

    // })
    this.authservice.obtenerDatos().subscribe({
      next: (res:any) => {
            this.resultados = res.filter((item:any) => item.title.toLowerCase().includes(this.query.toLowerCase()));
            console.log(this.resultados);
            
          }
      
    })
    
  })
  }

}
