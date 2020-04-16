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
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'w-ng5';
import { FormsModule } from '@angular/forms';
import { ClienteEditComponent } from './componente/cliente/cliente-edit/cliente-edit.component';
import { ClienteVerComponent } from './componente/cliente/cliente-ver/cliente-ver.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    MenulateralComponent,
    InicioComponent,
    ClienteNuevoComponent,
    ClientelistaComponent,
    MenuComponent,
    ClienteEditComponent,
    ClienteVerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PipesModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }) // ToastrModule added

  ],
  providers: [CatalogoService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
