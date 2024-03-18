import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../interfaces/Product.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  carrefour: Product[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCarrefour().subscribe((data: any) => {
      this.carrefour = data;
      console.log(this.carrefour);
    });
  }
}


