import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

declare var $: any;

@Component({
  selector: 'app-clientelista',
  templateUrl: './clientelista.component.html',
  styleUrls: ['./clientelista.component.css']
})

export class ClientelistaComponent implements OnInit {
  chkEstado = false;
  nombreEntidad = 'cliente';
  buscarCliente: any;
  respClientes: any = [];
  NoItemsPagina = 15;
  PaginaActual = 1;

  constructor(private clienteServicio: CatalogoService) { }

  ngOnInit(): void {
    this.CargarDatos();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
  }
  Seleccionado(id: any) {
    sessionStorage['idCliente'] = id;
  }

  async CargarDatos() {
    this.respClientes = await this.clienteServicio.ObtenerTodos(this.nombreEntidad);
    if (this.chkEstado) {
      this.respClientes = await this.respClientes.filter((cliente) => cliente.Estado !== 'A');
    }
    else {
      this.respClientes = await this.respClientes.filter((cliente) => cliente.Estado === 'A');
    }
  }
  VerTodos() {
    this.CargarDatos();
  }
}
