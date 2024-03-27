import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  edituserForm!: FormGroup
  id: string = ""

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute )
     {
        this.route.params.subscribe((param: Params) => this.id = param['id'])
        this.edituserForm = this.fb.group({
          name: ['', Validators.required],
          surname: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
        })

      }

  ngOnInit() {

    this.authService.getProfile(this.id).subscribe({
      next: (user: any) => {
        this.edituserForm.patchValue({
          name: user.name,
          surname: user.surname,
          email: user.email,
        });
      }
    })


  }

   
  edituser(){
    const formData = new FormData();
   

    // Obtén los valores del formulario
    const { name, surname, email } = this.edituserForm.value;

    // Agrega los valores al FormData
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    

    this.authService.editUser(this.id, formData).subscribe({
      next: (updateduser: User) => {
          console.log(updateduser)
      },
      error: (error:any) => {
        console.log(error)
      }
    })

  }
}
