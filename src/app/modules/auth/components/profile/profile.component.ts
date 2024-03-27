import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
 profile: any
 name: string = "";
  surname: string = "";
  email: string = "";
  user: any

  constructor (private authService:AuthService){

  }

  ngOnInit(): void {
    const userObject = {
      email: this.email,
      name: this.name,
      surname: this.surname
    };
    this.authService.getProfile(userObject).subscribe(
      (data: any) => {
        // Asegúrate de que data tenga la estructura correcta
        this.profile = data;
        localStorage.setItem('profile', JSON.stringify(data));
        console.log(this.profile);
      },
      (error: any) => {
        console.error('Error al obtener el perfil:', error);
        // Maneja el error según sea necesario, por ejemplo, mostrando un mensaje al usuario
      }
    )};


}
