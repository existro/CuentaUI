import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CuentaUI';

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    $('.ui.sidebar').sidebar({
      closable: false,
      dimPage: false,
      context: $('.bottom.segment')
    });

    $('.ui.accordion')
      .accordion()
      ;
  }

}
