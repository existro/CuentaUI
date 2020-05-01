import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
  providers: [DatePipe]
})
export class ClienteEditComponent implements OnInit {
  constructor(private servicio: CatalogoService, public router: Router, private datepipe: DatePipe, private mensaje: ToastrService) { }
  nombreEntidad = 'cliente';
  respCliente: any = [];
  respRegimen: any = [];
  submit = false;
  /*   guardado = false; */
  get FCont() { return this.FormCliente.controls; }
  FormCliente = new FormGroup({
    idCliente: new FormControl(''),
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Propietario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Nit: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]),
    Telefono: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){8,12}$')]),
    idRegimen: new FormControl(0, [Validators.min(1)]),
    FechaInicio: new FormControl('', [Validators.required]),
    SAT: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){2,6}$')]),
    Detalles: new FormControl('')
  });

  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
    $('.ui.dropdown')
      .dropdown();
  }
  ngOnInit(): void {
    this.CargarDatos();
    /* this.servicio.ObtenerUno(this.nombreEntidad, sessionStorage["idCliente"]).subscribe(
      res => {
        this.respCliente = res;
        this.FormCliente.controls.idCliente.setValue(this.respCliente.idCliente);
        this.FormCliente.controls.Nombre.setValue(this.respCliente.Nombre);
        this.FormCliente.controls.Propietario.setValue(this.respCliente.Propietario);
        this.FormCliente.controls.Nit.setValue(this.respCliente.Nit);
        this.FormCliente.controls.Telefono.setValue(this.respCliente.Telefono);
        this.FormCliente.controls.idRegimen.setValue(this.respCliente.idRegimen);
        this.FormCliente.controls.FechaInicio.setValue(this.datepipe.transform(this.respCliente.FechaInicio, 'yyyy-MM-dd'));
        this.FormCliente.controls.SAT.setValue(this.respCliente.SAT);
        this.FormCliente.controls.Detalles.setValue(this.respCliente.Detalles);
      },
      err => console.error(err)
    );

    this.servicio.ObtenerTodos('regimen').subscribe(
      res => {
        this.respRegimen = res;
      },
      err => console.error(err)
    );
 */

    /*  this.FormCliente.controls.idRegimen.valueChanges.subscribe(idRegimen =>
       this.respCliente.idRegimen = idRegimen);
     this.FormCliente.controls.idRegimen.setValue(this.respRegimen.filter(c => c.idRegimen === this.FormCliente.controls.idRegimen.value));
    */
  }

  async CargarDatos() {
    try {
      this.respCliente = await this.servicio.ObtenerUno(this.nombreEntidad, sessionStorage["idCliente"]);
      this.FormCliente.controls.idCliente.setValue(this.respCliente.idCliente);
      this.FormCliente.controls.Nombre.setValue(this.respCliente.Nombre);
      this.FormCliente.controls.Propietario.setValue(this.respCliente.Propietario);
      this.FormCliente.controls.Nit.setValue(this.respCliente.Nit);
      this.FormCliente.controls.Telefono.setValue(this.respCliente.Telefono);
      this.FormCliente.controls.idRegimen.setValue(this.respCliente.idRegimen);
      this.FormCliente.controls.FechaInicio.setValue(this.datepipe.transform(this.respCliente.FechaInicio, 'yyyy-MM-dd'));
      this.FormCliente.controls.SAT.setValue(this.respCliente.SAT);
      this.FormCliente.controls.Detalles.setValue(this.respCliente.Detalles);
      this.respRegimen = await this.servicio.ObtenerTodos('regimen');

    } catch (error) {

    }
  }


  async Guardar() {
    try {
      if (this.FormCliente.valid && this.FormCliente.touched) {
        const res = await this.servicio.Editar(this.nombreEntidad, this.FormCliente.value, sessionStorage["idCliente"]);
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormCliente.markAsUntouched();
          this.mensaje.success('El cliente se guardó correctamente', 'Guardado');
          //this.router.navigate(['/cliente/ver']);

        }
      }
      else {
        this.mensaje.info('No hay cambios para guardar', 'Información');
        this.submit = true;
      }
    } catch (error) {
      this.mensaje.error(error, 'Error');
    }
    /*     console.log(this.FormCliente.valid);
        if (this.FormCliente.valid && this.FormCliente.touched) {
         
    
          this.servicio.Editar(this.nombreEntidad, this.FormCliente.value, sessionStorage["idCliente"]).subscribe(
            res => {
              console.log(res);
              if (res["idGuardado"] > 0) {
               
                this.submit = false;
                this.FormCliente.markAsUntouched();
                this.mensaje.success('El cliente se guardó correctamente', 'Guardado');
                this.router.navigate(['/cliente/ver']);
              
              }
            },
            err => console.error(JSON.stringify(err))
          );
        } else {
          this.mensaje.info('No hay cambios para guardar', 'Información');
          this.submit = true;
        }*/
  }


  ModalEliminar() {
    $('#modalEliminarVer')
      .modal('show')
      ;
  }
  async Eliminar() {
    try {
      const res = await this.servicio.Inhabilitar(this.nombreEntidad, sessionStorage["idCliente"]);
      this.mensaje.success('El cliente se eliminó correctamente', 'Eliminado');
      this.router.navigate(['/cliente']);
    } catch (error) {
      console.log(error);
    }

    /*   console.log('Eliminando');
      this.servicio.Inhabilitar(this.nombreEntidad, sessionStorage["idCliente"]).subscribe(
        res => {
          this.respCliente = res;
          this.mensaje.success('El cliente se eliminó correctamente', 'Eliminado');
          this.router.navigate(['/cliente']);
        },
        err => console.error(err)
      ); */


  }

  ModalActivar() {
    $('#modalActivar')
      .modal('show')
      ;
  }
  async Activar() {
    try {
      const res = await this.servicio.Habilitar(this.nombreEntidad, sessionStorage["idCliente"]);
      this.mensaje.success('El cliente se activó correctamente', 'Activado');
      this.router.navigate(['/cliente']);
    } catch (error) {
      console.log(error);
    }



    /* 
        console.log('Eliminando');
        this.servicio.Habilitar(this.nombreEntidad, sessionStorage["idCliente"]).subscribe(
          res => {
            this.respCliente = res;
            this.mensaje.success('El cliente se activó correctamente', 'Activado');
            this.router.navigate(['/cliente']);
          },
          err => console.error(err)
        );
     */

  }

}

