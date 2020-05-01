import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-factura-lst',
  templateUrl: './factura-lst.component.html',
  styleUrls: ['./factura-lst.component.css']
})
export class FacturaLstComponent implements OnInit {

  chkEstado = false;
  nombreEntidad = 'factura';
  busqueda: any;
  facturas: any = [];
  NoItemsPagina = 15;
  PaginaActual = 1;

  constructor(private catalogos: CatalogoService, private router: Router) { }

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
  Seleccionar(id: any) {
    //  sessionStorage['idPersona'] = id;
    this.router.navigate(['/factura', id]);
  }
  async CargarDatos() {
    this.facturas = await this.catalogos.ObtenerTodos(this.nombreEntidad);
    if (this.chkEstado) {
      this.facturas = await this.facturas.filter((factura) => factura.Estado !== 'A');
    }
    else {
      this.facturas = await this.facturas.filter((factura) => factura.Estado === 'A');
    }
  }
}
