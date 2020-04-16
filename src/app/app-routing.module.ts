import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componente/inicio/inicio.component';
import { ClientelistaComponent } from './componente/cliente/clientelista/clientelista.component';
import { ClienteNuevoComponent } from './componente/cliente/cliente-nuevo/cliente-nuevo.component';
import { ClienteEditComponent } from './componente/cliente/cliente-edit/cliente-edit.component';
import { ClienteVerComponent } from './componente/cliente/cliente-ver/cliente-ver.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClientelistaComponent },
  { path: 'cliente/nuevo', component: ClienteNuevoComponent },
  { path: 'cliente/edit', component: ClienteEditComponent },
  { path: 'cliente/ver', component: ClienteVerComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
