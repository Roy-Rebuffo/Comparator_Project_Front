import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  resultados: any[] = [];
  query: string = '';
  favoritos: any = JSON.parse(localStorage.getItem('favoritos')!);
  @Output() productoFavorito: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params["search"];
      this.productService.obtener().subscribe({
        next: (res: any) => {
          this.resultados = res.filter((item: any) => this.matchQuery(item.title, this.query));
          console.log(this.resultados);
        }
      });
    });
  }

  matchQuery(text: string, query: string): boolean {
    // Convertir ambas cadenas a minúsculas y remover acentos
    const textNormalized = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const queryNormalized = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Verificar si la cadena normalizada incluye la consulta normalizada
    return textNormalized.includes(queryNormalized);
  }

  compareProduct(title: string): void {
    // Redirigir a la ruta /comparator y pasar el título del producto como parámetro
    this.router.navigate(['/comparator'], { queryParams: { title: title } });
  }

  addToFavorites(title: string, image: string, price: number) {
    const favoritesFromLocal = JSON.parse(localStorage.getItem('favoritos') || '[]');

    console.log(favoritesFromLocal);

    const existingTitleIndex = favoritesFromLocal.findIndex((prodFav: any) => prodFav.title === title && prodFav.image === image && prodFav.price === price);

    if (existingTitleIndex === -1) {
      // El producto no está en favoritos, así que lo agregamos
      favoritesFromLocal.push({ title: title, price: price, image: image }); // Agregamos el producto como un objeto con su título
    } else {
      // El producto ya está en favoritos, así que lo eliminamos
      favoritesFromLocal.splice(existingTitleIndex, 1);
    }

    // Actualizamos la lista de favoritos en el almacenamiento local
    localStorage.setItem('favoritos', JSON.stringify(favoritesFromLocal));
  }

  isFavorite(productTitle: string): boolean {
    const favoritesFromLocal = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (favoritesFromLocal !== null) {
      return favoritesFromLocal.some((prodFav: any) => prodFav.title === productTitle);
    } else {
      return false; // Si no hay favoritos, retornamos falso
    }
  }
}
