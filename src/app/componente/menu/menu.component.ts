import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  Abrirmenulateral() {
    $('.menu.sidebar')
      .sidebar('setting', 'transition', 'overlay')
      .sidebar('toggle');
  }



}

