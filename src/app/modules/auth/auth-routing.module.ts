import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'register', component: RegisterPageComponent,
      },
      {
        path: 'login', component: LoginPageComponent
      },
      {
        path: 'confirm-user/:token', component: ConfirmUserPageComponent
      },
      {
        path: '**', redirectTo: 'login', pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
