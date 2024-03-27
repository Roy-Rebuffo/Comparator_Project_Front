import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor() { }

  ngOnInit(): void {
    // Recuperar los datos del usuario del almacenamiento local
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      console.log('Datos del usuario:', this.userData);
    } else {
      console.error('No se encontraron datos de usuario en el almacenamiento local');
    }
  }
}
