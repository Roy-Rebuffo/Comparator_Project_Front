import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public visible = false;

  constructor() { }

  ngOnInit(): void {
    // Comprobamos si hay datos del Carrefour en el localStorage cuando se inicializa el componente
    this.checkCarrefourData();
  }

  checkCarrefourData(): void {
    // Aquí comprobamos si hay un array del Carrefour en el localStorage
    const Carrefour = localStorage.getItem('carrefour');

    // Si hay datos del Carrefour, no mostramos el spinner, de lo contrario lo mostramos
    if (Carrefour) {
      const carrefourData = JSON.parse(Carrefour);
      if (Array.isArray(carrefourData) && carrefourData.length > 0) {
        this.hideSpinner();
      } else {
        this.showSpinner();
      }
    } else {
      this.showSpinner();
    }
  }

  showSpinner(): void {
    this.visible = true;
  }

  hideSpinner(): void {
    this.visible = false;
  }
}

