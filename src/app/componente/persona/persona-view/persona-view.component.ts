import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-persona-view',
  templateUrl: './persona-view.component.html',
  styleUrls: ['./persona-view.component.css']
})
export class PersonaViewComponent implements OnInit {
  id: any;
  persona: any = [];
  empresas: any = [];
  nombreEntidad = 'persona';
  detalle =
    {
      filtro : 'idPersona',
      valor: 0
    };
  busqueda: any;
  NoItemsPagina = 15;
  PaginaActual = 1;
  chkEstado = false;

  
  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.aroute.snapshot.paramMap.get('id');
    this.detalle.valor = this.id;
    this.CargarDatos();
  }

  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
  }


  async CargarDatos() {
    try {
      this.persona = await this.catalogos.ObtenerUno(this.nombreEntidad, this.id);
      this.empresas = await this.catalogos.ObtenerDetalle('empresa', this.detalle);
      if (this.chkEstado) {
        this.empresas = await this.empresas.filter((empresa) => empresa.Estado !== 'A');
      }
      else {
        this.empresas = await this.empresas.filter((empresa) => empresa.Estado === 'A');
      }
    } catch (error) {
      console.log(error);
    }
  }

  Editar(id: any) {
    //  sessionStorage['idPersona'] = id;
    this.router.navigate(['/persona-edit', id]);
  }


  Seleccionar(id: any) {
    //  sessionStorage['idPersona'] = id;
    this.router.navigate(['/empresa', id]);
  }

  NuevaEmpresa(id: any) {
    this.router.navigate(['/empresa-new', id]);
  }
 

}
