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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'w-ng5';
import { FormsModule } from '@angular/forms';
import { ClienteEditComponent } from './componente/cliente/cliente-edit/cliente-edit.component';
import { ClienteVerComponent } from './componente/cliente/cliente-ver/cliente-ver.component';
import { DatePipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpinterceptorService } from './servicio/httpinterceptor.service';
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
import { UsuarioLstComponent } from './componente/usuario/usuario-lst/usuario-lst.component';
import { UsuarioNewComponent } from './componente/usuario/usuario-new/usuario-new.component';

@NgModule({
  declarations: [
    AppComponent,
    MenulateralComponent,
    InicioComponent,
    ClienteNuevoComponent,
    ClientelistaComponent,
    MenuComponent,
    ClienteEditComponent,
    ClienteVerComponent,
    PersonaLstComponent,
    PersonaViewComponent,
    PersonaNewComponent,
    PersonaEditComponent,
    EmpresaLstComponent,
    EmpresaViewComponent,
    EmpresaNewComponent,
    EmpresaEditComponent,
    FacturaLstComponent,
    FacturaNewComponent,
    FacturaViewComponent,
    FacturaEditComponent,
    UsuarioLstComponent,
    UsuarioNewComponent

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
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }) // ToastrModule added

  ],
  providers: [CatalogoService, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
