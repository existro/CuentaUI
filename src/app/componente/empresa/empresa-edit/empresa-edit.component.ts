import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {


  FormEmpresa = new FormGroup({
    idEmpresa: new FormControl(''),
    idPersona: new FormControl(0),
    idRegimen: new FormControl(0),
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    FechaInicio: new FormControl(''),
    SAT: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]),
    Detalles: new FormControl('')
  });

  id: any;
  nombreEntidad = 'empresa';
  empresa: any = [];
  regimens: any = [];
  personas: any = [];
  submit = false;
  get FCont() { return this.FormEmpresa.controls; }
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
      this.empresa = await this.catalogos.ObtenerUno(this.nombreEntidad, this.id);
      this.FormEmpresa.controls.idEmpresa.setValue(this.empresa.idEmpresa);
      this.FormEmpresa.controls.idPersona.setValue(this.empresa.idPersona);
      this.FormEmpresa.controls.idRegimen.setValue(this.empresa.idRegimen);
      this.FormEmpresa.controls.Nombre.setValue(this.empresa.Nombre);
      this.FormEmpresa.controls.FechaInicio.setValue(this.datepipe.transform(this.empresa.FechaInicio, 'yyyy-MM-dd'));
      this.FormEmpresa.controls.SAT.setValue(this.empresa.SAT);
      this.FormEmpresa.controls.Detalles.setValue(this.empresa.Detalles);
      this.personas = await this.catalogos.ObtenerTodos('persona');
      this.regimens = await this.catalogos.ObtenerTodos('regimen');
    } catch (error) {

    }
  }


  async Guardar() {
    try {
      if (this.FormEmpresa.valid && this.FormEmpresa.touched) {
        const res = await this.catalogos.Editar(this.nombreEntidad, this.FormEmpresa.value, this.id);
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormEmpresa.markAsUntouched();
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
      this.router.navigate(['/empresa']);
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
      this.router.navigate(['/empresa']);
    } catch (error) {
      console.log(error);
    }

  }
  Seleccionar(id: any) {
    this.router.navigate(['/empresa', id]);
  }





















}
