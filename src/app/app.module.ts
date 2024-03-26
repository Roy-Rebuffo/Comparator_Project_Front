import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HTTP_INTERCEPTORS , HttpClientModule } from '@angular/common/http';
import { AssignTokenInterceptor } from './modules/auth/interceptors/assign-token.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AssignTokenInterceptor, multi: true   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
