import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-persona-new',
  templateUrl: './persona-new.component.html',
  styleUrls: ['./persona-new.component.css']
})
export class PersonaNewComponent implements OnInit {
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
      if (this.FormPersona.valid && this.FormPersona.touched) {
        const res = await this.catalogos.Guardar(this.nombreEntidad, this.FormPersona.value);
        this.id = res["idGuardado"];
        if (res["idGuardado"] > 0) {
          this.submit = false;
          this.FormPersona.markAsUntouched();
          this.mensaje.success('El registro se guardó correctamente', 'Guardado');
          this.router.navigate(['/persona', this.id]);
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

}
