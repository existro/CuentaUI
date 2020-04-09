import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './componente/inicio/inicio.component';
import { ClientelistaComponent } from './componente/cliente/clientelista/clientelista.component';
import { ClienteNuevoComponent } from './componente/cliente/cliente-nuevo/cliente-nuevo.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClientelistaComponent },
  { path: 'cliente-nuevo', component: ClienteNuevoComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
