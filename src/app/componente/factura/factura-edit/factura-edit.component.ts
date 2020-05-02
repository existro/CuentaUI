import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-factura-edit',
  templateUrl: './factura-edit.component.html',
  styleUrls: ['./factura-edit.component.css']
})
export class FacturaEditComponent implements OnInit {

  FormFactura = new FormGroup({
    idFactura: new FormControl(0),
    idEmpresa: new FormControl(0),
    idCuenta: new FormControl(0),
    Fecha: new FormControl(''),
    Serie: new FormControl(''),
    NumeroDoc: new FormControl('', [Validators.required]),
    NitClienteFactura: new FormControl(''),
    NombreClienteFactura: new FormControl('', [Validators.required]),
    Total: new FormControl(''),
    TipoFactura: new FormControl('', [Validators.required])
  });

  id: any;
  nombreEntidad = 'factura';
  factura: any = [];
  cuentas: any = [];
  submit = false;
  get FCont() { return this.FormFactura.controls; }
  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private mensaje: ToastrService, public router: Router, private datepipe: DatePipe) { }


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
    $('.ui.dropdown')
      .dropdown();
  }

  async CargarDatos() {
    try {
      this.factura = await this.catalogos.ObtenerUno(this.nombreEntidad, this.id);
      this.FormFactura.controls.idFactura.setValue(this.factura.idFactura);
      this.FormFactura.controls.idEmpresa.setValue(this.factura.idEmpresa);
      this.FormFactura.controls.idCuenta.setValue(this.factura.idCuenta);
      this.FormFactura.controls.Serie.setValue(this.factura.Serie);
      this.FormFactura.controls.NumeroDoc.setValue(this.factura.NumeroDoc);
      this.FormFactura.controls.Fecha.setValue(this.datepipe.transform(this.factura.Fecha, 'yyyy-MM-dd'));
      this.FormFactura.controls.NitClienteFactura.setValue(this.factura.NitClienteFactura);
      this.FormFactura.controls.NombreClienteFactura.setValue(this.factura.NombreClienteFactura);
      this.FormFactura.controls.Total.setValue(this.factura.Total);
      this.FormFactura.controls.TipoFactura.setValue(this.factura.TipoFactura);
      this.cuentas = await this.catalogos.ObtenerTodos('cuenta');
    } catch (error) {

    }
  }


  async Guardar() {
    try {
      if (this.FormFactura.valid && this.FormFactura.touched) {
        const res = await this.catalogos.Editar(this.nombreEntidad, this.FormFactura.value, this.id);
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormFactura.markAsUntouched();
          this.mensaje.success('El registro se guardó correctamente', 'Guardado');
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


  ModalEliminar() {
    $('#modalEliminarVer')
      .modal('show')
      ;
  }
  async Eliminar() {
    try {
      const res = await this.catalogos.Inhabilitar(this.nombreEntidad, this.id);
      this.mensaje.success('El registro se eliminó correctamente', 'Eliminado');
      this.router.navigate(['/factura']);
    } catch (error) {
      console.log(error);
    }

  }

  ModalActivar() {
    $('#modalActivar')
      .modal('show')
      ;
  }
  async Activar() {
    try {
      const res = await this.catalogos.Habilitar(this.nombreEntidad, this.id);
      this.mensaje.success('El registro se activó correctamente', 'Activado');
      this.router.navigate(['/factura']);
    } catch (error) {
      console.log(error);
    }

  }
  Seleccionar(id: any) {
    this.router.navigate(['/factura', id]);
  }

}
