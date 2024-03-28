import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmUserPageComponent } from './pages/confirm-user-page/confirm-user-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ComparatorComponent } from './components/comparator/comparator.component';
import { AhorramasComponent } from './components/ahorramas/ahorramas.component';
import { CarrefourComponent } from './components/carrefour/carrefour.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';



@NgModule({
  declarations: [
    ConfirmUserPageComponent,
    LandingComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    SearchResultsComponent,
    ComparatorComponent,
    AhorramasComponent,
    CarrefourComponent,
    AboutUsComponent,
    SpinnerComponent,
    FavoritosComponent,
    PrivacyPolicyComponent,
    FaqComponent,
    PaymentComponent,
    ProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
