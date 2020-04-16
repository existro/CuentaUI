import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  API_URI = 'http://www.existro.shekalug.org/cuentapi';
  constructor(private http: HttpClient) { }


  ObtenerTodos(cNombre: string) {
    return this.http.get(`${this.API_URI}/${cNombre}`);
  }

  ObtenerUno(cNombre: string, id: string) {
    return this.http.get(`${this.API_URI}/${cNombre}/${id}`);
  }

  Guardar(cNombre: string, cliente: any) {
    return this.http.post(`${this.API_URI}/${cNombre}`, cliente);
  }

  Editar(cNombre: string, cliente: any, id: string) {
    return this.http.post(`${this.API_URI}/${cNombre}/1`, cliente);
  }
}
