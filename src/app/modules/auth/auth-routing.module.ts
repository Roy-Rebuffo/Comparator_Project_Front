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
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { verifyTokenGuard } from './guards/verify-token.guard';
import { FaqComponent } from './pages/faq/faq.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';




  const routes: Routes = [
    {
      path: '', children: [
        {
          path: 'landing', component: LandingComponent
        },
        {
          path: 'about', canActivate: [verifyTokenGuard], component: AboutUsComponent
        },
        {
          path: 'faq', canActivate: [verifyTokenGuard], component: FaqComponent
        },
        {
          path: 'payment', canActivate: [verifyTokenGuard], component: PaymentComponent
        },
        {
          path: 'privacy-policy', canActivate: [verifyTokenGuard], component: PrivacyPolicyComponent
        },
        {
          path: 'confirm-user/:token', component: ConfirmUserPageComponent
        },
        {
          path: 'home', canActivate: [verifyTokenGuard], component: HomePageComponent
        },
        {
          path: 'ahorramas', canActivate: [verifyTokenGuard], component: AhorramasComponent
        },
        {
          path: 'carrefour', canActivate: [verifyTokenGuard], component: CarrefourComponent
        },
        {
          path: 'results/:search', canActivate: [verifyTokenGuard], component: SearchResultsComponent
        },
        {
          path: 'comparator', canActivate: [verifyTokenGuard], component: ComparatorComponent
        },
        {
          path: 'favoritos', canActivate: [verifyTokenGuard], component: FavoritosComponent
        },
        {
          path: 'profile', canActivate: [verifyTokenGuard], component: ProfileComponent
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
