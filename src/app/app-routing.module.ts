import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { verifyTokenGuard } from './modules/auth/guards/verify-token.guard';
import { LandingComponent } from './modules/auth/pages/landing/landing.component';

const routes: Routes = [
  {
  path: '', loadChildren: () => import('./modules/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: '**', redirectTo: 'landing', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
