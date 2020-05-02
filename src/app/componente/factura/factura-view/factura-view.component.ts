import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
declare var $: any;

@Component({
  selector: 'app-factura-view',
  templateUrl: './factura-view.component.html',
  styleUrls: ['./factura-view.component.css']
})
export class FacturaViewComponent implements OnInit {
  id: any;
  factura: any = [];

  nombreEntidad = 'factura';
  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.aroute.snapshot.paramMap.get('id');
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
      this.factura = await this.catalogos.ObtenerUno(this.nombreEntidad, this.id);
    } catch (error) {
      console.log(error);
    }
  }

  Editar(id: any) {
    this.router.navigate(['/factura-edit', id]);
  }

}
