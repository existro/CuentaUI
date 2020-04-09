import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-cliente-nuevo',
  templateUrl: './cliente-nuevo.component.html',
  styleUrls: ['./cliente-nuevo.component.css']
})
export class ClienteNuevoComponent implements OnInit {


  respRegimen: any = [];
  respGuardar: any;
  submit = false;
  FormCliente = new FormGroup({
    Nombre: new FormControl('', [Validators.required]),
    Propietario: new FormControl('', [Validators.required]),
    Nit: new FormControl('', [Validators.required]),
    Telefono: new FormControl('', [Validators.required]),
    idRegimen: new FormControl(''),
    FechaInicio: new FormControl(Date, [Validators.required]),
    SAT: new FormControl('', [Validators.required])
  });

  constructor(private servicio: CatalogoService) {

  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.ui.dropdown')
      .dropdown();
    $('.datetimepicker').calendar({
      type: 'date',
      formatter: {
        date: function (date, settings) {
          if (!date) return '';
          var day = date.getDate();
          var month = date.getMonth() + 1;
          var year = date.getFullYear();
          $("#FechaInicio").value = day + '/' + month + '/' + year;
          return day + '/' + month + '/' + year;
        }
      }
    });
  }

  ngOnInit(): void {
    this.servicio.ObtenerTodos('regimen').subscribe(
      res => { this.respRegimen = res; },
      err => console.error(err)
    );
  }

  GuardarNuevo() {
    console.log(this.FormCliente);
    this.servicio.Guardar('Cliente', this.FormCliente.value).subscribe(
      res => { this.respGuardar = res; },
      err => console.error(JSON.stringify(err))
    );
  }


}
