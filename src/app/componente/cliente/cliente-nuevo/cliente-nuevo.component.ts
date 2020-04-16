import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrls: ['./cliente-nuevo.component.css']
})
export class ClienteNuevoComponent implements OnInit {

  disableButton = false;
  respRegimen: any = [];
  respGuardar: any;
  submit = false;
  guardado = false;
  get FCont() { return this.FormCliente.controls; }

  FormCliente = new FormGroup({
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Propietario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Nit: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]),
    Telefono: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){8,12}$')]),
    idRegimen: new FormControl(0, [Validators.min(1)]),
    FechaInicio: new FormControl('', [Validators.required]),
    SAT: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){2,6}$')]),
    Detalles: new FormControl('')
  });

  constructor(private servicio: CatalogoService, private mensaje: ToastrService) {

  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.ui.dropdown')
      .dropdown();

    /* $('.message')
      // tslint:disable-next-line: space-before-function-paren
      .on('click', function () {
        $(this)
          .closest('.message')
          .transition('fade')
          ;
      })
      ; */

  }

  ngOnInit(): void {
    this.servicio.ObtenerTodos('regimen').subscribe(
      res => { this.respRegimen = res; },
      err => console.error(err)
    );
  }

  Guardar() {
    this.disableButton = true;
    this.submit = true;
    console.log(this.FormCliente);
    if (this.FormCliente.valid) {
      this.servicio.Guardar('cliente', this.FormCliente.value).subscribe(
        res => {
          console.log(res);
          if (res["idGuardado"] > 0) {
            sessionStorage["idCliente"] = res["idGuardado"];
            this.FormCliente.reset();
            this.submit = false;
            this.mensaje.success('El cliente se guardó correctamente', 'Guardado');
            /* $('#modalGuardado')
              .modal('show')
              ; */
          }
        },
        err => console.error(JSON.stringify(err))
      );
    } else {
      this.mensaje.info('Ingrese todos los campos correctamente', 'Información');
    }

  }

  FechaCambio(val: any) {
    console.log(val);
  }


}
