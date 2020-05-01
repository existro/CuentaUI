import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.css']
})
export class PersonaEditComponent implements OnInit {
  FormPersona = new FormGroup({
    idPersona: new FormControl(''),
    Nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    Nit: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]),
    Telefono: new FormControl('', [Validators.required, Validators.pattern('^([0-9]){8,12}$')]),
    CorreoE: new FormControl('', [Validators.required])
  });

  id: any;
  persona: any = [];
  nombreEntidad = 'persona';
  personas: any = [];
  submit = false;
  get FCont() { return this.FormPersona.controls; }

  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private mensaje: ToastrService, public router: Router) { }

  
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
      this.persona = await this.catalogos.ObtenerUno(this.nombreEntidad, this.id);
      this.FormPersona.controls.idPersona.setValue(this.persona.idPersona);
      this.FormPersona.controls.Nombres.setValue(this.persona.Nombres);
      this.FormPersona.controls.Apellidos.setValue(this.persona.Apellidos);
      this.FormPersona.controls.Nit.setValue(this.persona.Nit);
      this.FormPersona.controls.Telefono.setValue(this.persona.Telefono);
      this.FormPersona.controls.CorreoE.setValue(this.persona.CorreoE);
    } catch (error) {

    }
  }


  async Guardar() {
    try {
      if (this.FormPersona.valid && this.FormPersona.touched) {
        const res = await this.catalogos.Editar(this.nombreEntidad, this.FormPersona.value, this.id);
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormPersona.markAsUntouched();
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
      this.router.navigate(['/persona']);
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
      this.router.navigate(['/persona']);
    } catch (error) {
      console.log(error);
    }

  }
  Seleccionar(id: any) {
    this.router.navigate(['/persona', id]);
  }




}
