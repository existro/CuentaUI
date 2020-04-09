import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

@Component({
  selector: 'app-clientelista',
  templateUrl: './clientelista.component.html',
  styleUrls: ['./clientelista.component.css']
})
export class ClientelistaComponent implements OnInit {

  respClientes: any = [];
  constructor(private clienteServicio: CatalogoService) { }

  ngOnInit(): void {
    this.clienteServicio.ObtenerTodos('cliente').subscribe(
      res => { this.respClientes = res; },
      err => console.error(err)
    );
  }

}
