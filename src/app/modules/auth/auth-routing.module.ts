import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';



  const routes: Routes = [
    {
      path: '', children: [
        {
          path: 'landing', component: LandingComponent
        },
        {
          path: 'confirm-user/:token', component: ConfirmUserPageComponent
        },
        {
          path: 'home', component: HomePageComponent
        },
        {
          path: 'results', component: SearchResultsComponent
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
