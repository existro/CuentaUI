import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-persona-lst',
  templateUrl: './persona-lst.component.html',
  styleUrls: ['./persona-lst.component.css']
})
export class PersonaLstComponent implements OnInit {
  chkEstado = false;
  nombreEntidad = 'persona';
  busqueda: any;
  personas: any = [];
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
    this.router.navigate(['/persona', id]);
  }
  async CargarDatos() {
    this.personas = await this.catalogos.ObtenerTodos(this.nombreEntidad);
    console.log(this.personas);
    if (this.chkEstado) {
      this.personas = await this.personas.filter((persona) => persona.Estado !== 'A');
    }
    else {
      this.personas = await this.personas.filter((persona) => persona.Estado === 'A');
    }
    
  }
  VerTodos() {
    this.CargarDatos();
  }
}
