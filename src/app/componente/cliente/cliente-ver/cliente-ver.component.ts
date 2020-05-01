import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

declare var $: any;

@Component({
  selector: 'app-cliente-ver',
  templateUrl: './cliente-ver.component.html',
  styleUrls: ['./cliente-ver.component.css']
})
export class ClienteVerComponent implements OnInit {
  nombreEntidad = 'cliente';
  respCliente: any = [];
  respRegimen: any = [];
  constructor(private servicio: CatalogoService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
  }

  ngOnInit(): void {
    this.CargarDatos();
  }
  async CargarDatos() {
    try {
      this.respCliente = await this.servicio.ObtenerUno(this.nombreEntidad, sessionStorage["idCliente"]);
      this.respRegimen = await this.servicio.ObtenerUno('regimen', this.respCliente.idRegimen);

    } catch (error) {
      console.log(error);
    }
  }



}
