import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-empresa-lst',
  templateUrl: './empresa-lst.component.html',
  styleUrls: ['./empresa-lst.component.css']
})
export class EmpresaLstComponent implements OnInit {

  chkEstado = false;
  nombreEntidad = 'empresa';
  busqueda: any;
  empresas: any = [];
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
    this.router.navigate(['/empresa', id]);
  }
  async CargarDatos() {
    this.empresas = await this.catalogos.ObtenerTodos(this.nombreEntidad);
    if (this.chkEstado) {
      this.empresas = await this.empresas.filter((empresa) => empresa.Estado !== 'A');
    }
    else {
      this.empresas = await this.empresas.filter((empresa) => empresa.Estado === 'A');
    }
  }
}
