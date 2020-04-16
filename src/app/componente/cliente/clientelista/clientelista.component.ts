import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
declare var $: any;

@Component({
  selector: 'app-clientelista',
  templateUrl: './clientelista.component.html',
  styleUrls: ['./clientelista.component.css']
})
export class ClientelistaComponent implements OnInit {
  buscarCliente: any;
  respClientes: any = [];
  NoItemsPagina = 15;
  PaginaActual = 1;

  constructor(private clienteServicio: CatalogoService) { }

  ngOnInit(): void {
    this.clienteServicio.ObtenerTodos('cliente').subscribe(
      res => {
        this.respClientes = res;
      },
      err => console.error(err)
    );
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
    sessionStorage["idCliente"] = id;
  }
}
