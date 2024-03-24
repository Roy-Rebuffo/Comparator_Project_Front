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

  addToFavorites(title: string, image: string, price:number) {
    const favoritesFromLocal = JSON.parse(localStorage.getItem('favoritos') || '[]');

    console.log(favoritesFromLocal);

    const existingTitleIndex = favoritesFromLocal.findIndex((prodFav: any) => prodFav.title === title && prodFav.image === image && prodFav.price === price);

    if (existingTitleIndex === -1) {
        // El producto no está en favoritos, así que lo agregamos
        favoritesFromLocal.push({ title: title, price: price,image: image }); // Agregamos el producto como un objeto con su título
    } else {
        // El producto ya está en favoritos, así que lo eliminamos
        favoritesFromLocal.splice(existingTitleIndex, 1);
        
    }

    // Actualizamos la lista de favoritos en el almacenamiento local
    localStorage.setItem('favoritos', JSON.stringify(favoritesFromLocal));
  }

  toggleFavorite(favorito: any) {
    const index = this.favoritos.findIndex((fav: any) => fav.title === favorito.title);
    if (index !== -1) {
      // Si el producto ya está en favoritos, lo eliminamos
      this.favoritos.splice(index, 1);
    } else {
      // Si el producto no está en favoritos, lo agregamos
      this.favoritos.push(favorito);
    }
    // Actualizamos el almacenamiento local
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
  
}
