import { Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/servicio/catalogo.service';

declare var $: any;

@Component({
  selector: 'app-cliente-ver',
  templateUrl: './cliente-ver.component.html',
  styleUrls: ['./cliente-ver.component.css']
})
export class ClienteVerComponent implements OnInit {
  respCliente: any = [];
  respRegimen: any = [];
  constructor(private servicio: CatalogoService) { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterContentInit(): void {
    $('.msjflotante')
      .popup({
        position: 'bottom left',
        transition: 'fade'
      });
  }

  ngOnInit(): void {

    this.servicio.ObtenerUno('cliente', sessionStorage["idCliente"]).subscribe(
      res => {
        this.respCliente = res;
        this.servicio.ObtenerUno('regimen', this.respCliente.idRegimen).subscribe(
          resreg => {
            this.respRegimen = resreg;
          },
          err => console.error(err)
        );
      },
      err => console.error(err)
    );
  }




}
