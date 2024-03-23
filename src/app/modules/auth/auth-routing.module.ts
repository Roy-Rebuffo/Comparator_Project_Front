import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ComparatorComponent } from './components/comparator/comparator.component';
import { AhorramasComponent } from './components/ahorramas/ahorramas.component';
import { CarrefourComponent } from './components/carrefour/carrefour.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';




  const routes: Routes = [
    {
      path: '', children: [
        {
          path: 'landing', component: LandingComponent
        },
        {
          path: 'about', component: AboutUsComponent
        },
        {
          path: 'confirm-user/:token', component: ConfirmUserPageComponent
        },
        {
          path: 'home', component: HomePageComponent
        },
        {
          path: 'ahorramas', component: AhorramasComponent
        },
        {
          path: 'carrefour', component: CarrefourComponent
        },
        {
          path: 'results/:search', component: SearchResultsComponent
        },
        {
          path: 'comparator', component: ComparatorComponent
        },
        {
          path: 'favoritos', component: FavoritosComponent
        },
        {
          path: '**', redirectTo: 'landing', pathMatch: 'full'
        }
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
