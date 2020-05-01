import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-empresa-new',
  templateUrl: './empresa-new.component.html',
  styleUrls: ['./empresa-new.component.css']
})
export class EmpresaNewComponent implements OnInit {

  FormEmpresa = new FormGroup({
    idPersona: new FormControl(0),
    idRegimen: new FormControl(0),
    Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]),
    FechaInicio: new FormControl(''),
    SAT: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]),
    Detalles: new FormControl('')
  });

  id: any;
  idPersona: any = 0;
  nombreEntidad = 'empresa';
  regimens: any = [];
  personas: any = [];
  submit = false;
  get FCont() { return this.FormEmpresa.controls; }


  constructor(private catalogos: CatalogoService, private aroute: ActivatedRoute, private mensaje: ToastrService, public router: Router) { }


  ngOnInit(): void {
    this.idPersona = this.aroute.snapshot.paramMap.get('idPersona');
    if (this.idPersona) {
      this.FCont.idPersona.setValue(this.idPersona);
    }
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
      if (this.FormEmpresa.valid && this.FormEmpresa.touched) {
        const res = await this.catalogos.Guardar(this.nombreEntidad, this.FormEmpresa.value);
        this.id = res["idGuardado"];
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormEmpresa.markAsUntouched();
          this.mensaje.success('El registro se guardó correctamente', 'Guardado');
          this.router.navigate(['/empresa', this.id]);
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
      this.personas = await this.catalogos.ObtenerTodos('persona');
      this.regimens = await this.catalogos.ObtenerTodos('regimen');
    } catch (error) {
      this.mensaje.error(error, 'Error');
    }


  }

}
