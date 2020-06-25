import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-contabilidad-lst',
  templateUrl: './contabilidad-lst.component.html',
  styleUrls: ['./contabilidad-lst.component.css']
})
export class ContabilidadLstComponent implements OnInit {
  chkEstado = false;
  nombreEntidad = 'contabilidad';
  busqueda: any;
  contabilidad: any = [];
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
    $('.ui.table').tablesort();
  }
  Seleccionar(id: any) {
    //  sessionStorage['idPersona'] = id;
    this.router.navigate(['/factura', id]);
  }
  async CargarDatos() {
    this.contabilidad = await this.catalogos.ObtenerTodos(this.nombreEntidad);
    if (this.chkEstado) {
      this.contabilidad = await this.contabilidad.filter((conta) => conta.Estado !== 'A');
    }
    else {
      this.contabilidad = await this.contabilidad.filter((conta) => conta.Estado === 'A');
    }

  }
}
