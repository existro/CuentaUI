import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componente/inicio/inicio.component';
import { ClientelistaComponent } from './componente/cliente/clientelista/clientelista.component';
import { ClienteNuevoComponent } from './componente/cliente/cliente-nuevo/cliente-nuevo.component';
import { ClienteEditComponent } from './componente/cliente/cliente-edit/cliente-edit.component';
import { ClienteVerComponent } from './componente/cliente/cliente-ver/cliente-ver.component';
import { PersonaLstComponent } from './componente/persona/persona-lst/persona-lst.component';
import { PersonaViewComponent } from './componente/persona/persona-view/persona-view.component';
import { PersonaNewComponent } from './componente/persona/persona-new/persona-new.component';
import { PersonaEditComponent } from './componente/persona/persona-edit/persona-edit.component';
import { EmpresaLstComponent } from './componente/empresa/empresa-lst/empresa-lst.component';
import { EmpresaViewComponent } from './componente/empresa/empresa-view/empresa-view.component';
import { EmpresaNewComponent } from './componente/empresa/empresa-new/empresa-new.component';
import { EmpresaEditComponent } from './componente/empresa/empresa-edit/empresa-edit.component';
import { FacturaLstComponent } from './componente/factura/factura-lst/factura-lst.component';
import { FacturaNewComponent } from './componente/factura/factura-new/factura-new.component';
import { FacturaViewComponent } from './componente/factura/factura-view/factura-view.component';
import { FacturaEditComponent } from './componente/factura/factura-edit/factura-edit.component';
import { ContabilidadLstComponent } from './componente/contabilidad/contabilidad-lst/contabilidad-lst.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClientelistaComponent },
  { path: 'cliente-nuevo', component: ClienteNuevoComponent },
  { path: 'cliente-editar', component: ClienteEditComponent },
  { path: 'cliente-ver', component: ClienteVerComponent },
  { path: 'persona', component: PersonaLstComponent },
  { path: 'persona/:id', component: PersonaViewComponent },
  { path: 'persona-new', component: PersonaNewComponent },
  { path: 'persona-edit/:id', component: PersonaEditComponent },
  { path: 'empresa', component: EmpresaLstComponent },
  { path: 'empresa/:id', component: EmpresaViewComponent },
  { path: 'empresa-new', component: EmpresaNewComponent },
  { path: 'empresa-new/:idPersona', component: EmpresaNewComponent },
  { path: 'empresa-edit/:id', component: EmpresaEditComponent },
  { path: 'factura', component: FacturaLstComponent },
  { path: 'factura-new', component: FacturaNewComponent },
  { path: 'factura/:id', component: FacturaViewComponent },
  { path: 'factura-edit/:id', component: FacturaEditComponent },
  { path: 'contabilidad', component: ContabilidadLstComponent },

  { path: '', component: InicioComponent },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { /* onSameUrlNavigation: 'reload', */ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
