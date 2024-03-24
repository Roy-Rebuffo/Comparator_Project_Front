import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent {
  @Input() favoriteProduct: any;
  favoritos: any = JSON.parse(localStorage.getItem('favoritos')!)

  constructor(){
    console.log(this.favoritos);

  }

  agregarFavorito(favoriteProduct: any) {
    this.favoritos.push(favoriteProduct);
    if (localStorage.getItem('favoritos')) {   localStorage.setItem('favoritos', JSON.stringify([])); }
  }
}
