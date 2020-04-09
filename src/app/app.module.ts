import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenulateralComponent } from './componente/menulateral/menulateral.component';
import { InicioComponent } from './componente/inicio/inicio.component';
import { ClienteNuevoComponent } from './componente/cliente/cliente-nuevo/cliente-nuevo.component';
import { ClientelistaComponent } from './componente/cliente/clientelista/clientelista.component';
import { MenuComponent } from './componente/menu/menu.component';
import { CatalogoService } from './servicio/catalogo.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MenulateralComponent,
    InicioComponent,
    ClienteNuevoComponent,
    ClientelistaComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [CatalogoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
