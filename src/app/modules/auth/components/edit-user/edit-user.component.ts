import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../interfaces/User.interface';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  edituserForm!: FormGroup;
  id: string = "";
  userData: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((param: Params) => this.id = param['id']);
    console.log('ID recogido de la ruta:', this.id);
    this.edituserForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      this.patchFormWithUserData();
    } else {
      console.error('No se encontraron datos de usuario en el almacenamiento local');
    }
  }

  patchFormWithUserData() {
    if (this.userData) {
      this.edituserForm.patchValue({
        name: this.userData.name,
        surname: this.userData.surname,
        email: this.userData.email,
      });
    }
  }

  edituser() {
    const { name, surname, email } = this.edituserForm.value;

    const userData = { name, surname, email }; // Construye un objeto JavaScript con los datos del formulario

    console.log(userData); // Verifica el objeto userData antes de enviarlo

    this.authService.editUser(this.id, userData).subscribe({
      next: (updateduser: User) => {
        console.log(updateduser);

        // Actualizar los datos del usuario en el componente y en el almacenamiento local
        this.userData = { ...this.userData, name: updateduser.name, surname: updateduser.surname, email: updateduser.email };
        localStorage.setItem('userData', JSON.stringify(this.userData));

        this.router.navigate(['/profile']);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  deleteUserFromComponent(id: any) {
    this.authService.deleteUser(id).subscribe(
      (response) => {
        console.log('Usuario eliminado con éxito');
        // Aquí podrías implementar la lógica adicional después de eliminar el usuario
        this.router.navigate(['/landing']);
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
        // Aquí podrías implementar la lógica para manejar el error si es necesario
      }
    );
  }
}
