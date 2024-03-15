import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  message: string = "";
  status: 'loading' | 'unauthorized' | 'success' | 'disabled' = 'disabled'
registerForm!: FormGroup

constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
  this.registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8), Validators.maxLength(12)]]
  })

}

formHandler() {
  this.status = 'loading'
  if(this.registerForm.valid){
    const {name, surname, email, password} = this.registerForm.value;
    const objectToSend = {
      name,
      surname,
      email,
      password
    }
    this.authService.register(objectToSend).subscribe({
      next: (response: any) => {
        this.status = 'success'
        this.message = response.msg
      },
      error: (error) => {
        console.log(error)
          this.status = 'unauthorized'
          this.message = error.error.msg
      }
    })
    this.registerForm.reset()
  }
}


}
