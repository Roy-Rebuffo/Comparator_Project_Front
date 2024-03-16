import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {  HTTP_INTERCEPTORS , HttpClientModule } from '@angular/common/http';
import { AssignTokenInterceptor } from './modules/auth/interceptors/assign-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{     provide: HTTP_INTERCEPTORS, useClass: AssignTokenInterceptor, multi: true   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
