import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  API_URI = '/cuentapi';
  // API_URI = 'http://localhost:8080/cuentapi';
  // API_URI = 'http://www.existro.shekalug.org/cuentapi/';
  constructor(private http: HttpClient) { }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 500);
    });
  }

  ObtenerTodos(cNombre: string) {

    return this.http.get(`${this.API_URI}/${cNombre}`).toPromise();
  }
  ObtenerUno(cNombre: string, id: string) {
    return this.http.get(`${this.API_URI}/${cNombre}/${id}`).toPromise();
  }

  Guardar(cNombre: string, datos: any) {
    return this.http.post(`${this.API_URI}/${cNombre}`, datos).toPromise();
  }

  Editar(cNombre: string, datos: any, id: string) {
    return this.http.post(`${this.API_URI}/${cNombre}/1`, datos).toPromise();
  }
  ObtenerDetalle(cNombre: string, datos: any) {
    return this.http.post(`${this.API_URI}/${cNombre}/2`, datos).toPromise();
  }
  Inhabilitar(cNombre: string, id: string) {
    return this.http.delete(`${this.API_URI}/${cNombre}/${id}`).toPromise();
  }
  Habilitar(cNombre: string, id: string) {
    return this.http.put(`${this.API_URI}/${cNombre}/${id}`, null).toPromise();
  }



}
