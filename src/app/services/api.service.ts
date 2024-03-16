import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = "";

  constructor( private servicio: HttpClient) { }

  public ConsultarUsuarios(){
    return this.servicio.get(this.urlApi)
  }


}
