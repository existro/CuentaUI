import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-factura-new',
  templateUrl: './factura-new.component.html',
  styleUrls: ['./factura-new.component.css']
})
export class FacturaNewComponent implements OnInit {

  FormFactura = new FormGroup({
    idEmpresa: new FormControl(0),
    idCuenta: new FormControl(0),
    Fecha: new FormControl(''),
    Serie: new FormControl(''),
    NumeroDoc: new FormControl('', [Validators.required]),
    NitClienteFactura: new FormControl(''),
    NombreClienteFactura: new FormControl('', [Validators.required]),
    Total: new FormControl(''),
    TipoFactura: new FormControl('')
  });

  id: any;
  idEmpresa: any;
  nombreEntidad = 'factura';
  cuentas: any = [];
  empresas: any = [];
  facturas: any = [];
  submit = false;
  detalle =
    {
      filtro: '',
      valor: 0
    };
  get FCont() { return this.FormFactura.controls; }
  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private mensaje: ToastrService, public router: Router, private datepipe: DatePipe) { }


  ngOnInit(): void {
    this.CargarDatos();
  }

  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
    $('.ui.dropdown')
      .dropdown();
  }

  async Guardar() {
    try {
      if (this.FormFactura.valid && this.FormFactura.touched) {
        console.log(this.FormFactura.value);
        const res = await this.catalogos.Guardar(this.nombreEntidad, this.FormFactura.value);
        this.id = res["idGuardado"];
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormFactura.markAsUntouched();
          this.mensaje.success('El registro se guardó correctamente', 'Guardado');
          this.selectempresa(this.idEmpresa);
          this.FormFactura.controls.Fecha.reset();
          this.FormFactura.controls.NumeroDoc.reset();
          this.FormFactura.controls.idCuenta.setValue(0);
          this.FormFactura.controls.Serie.reset();
          this.FormFactura.controls.NitClienteFactura.reset();
          this.FormFactura.controls.NombreClienteFactura.reset();
          this.FormFactura.controls.Total.reset();
        }
      }
      else {
        this.mensaje.info('No hay cambios para guardar', 'Información');
        this.submit = true;
      }
    } catch (error) {
      this.mensaje.error(error, 'Error');
    }
  }

  async CargarDatos() {
    try {
      this.cuentas = await this.catalogos.ObtenerTodos('cuenta');
      this.empresas = await this.catalogos.ObtenerTodos('empresa');

    } catch (error) {
      this.mensaje.error(error, 'Error');
    }
  }
  async selectempresa(value: any) {



    this.idEmpresa = value;
    this.detalle.valor = value;
    this.detalle.filtro = 'idEmpresa';
    console.log(this.detalle);
    this.facturas = await this.catalogos.ObtenerDetalle('factura', this.detalle);
    this.facturas = await this.facturas.filter((factura) => this.datepipe.transform(factura.FechaRegistro, 'yyyy-MM-dd') === this.datepipe.transform( Date.now() , 'yyyy-MM-dd') );
    console.log(this.facturas); 
  }

}
