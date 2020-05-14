import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar: string = '';
  ideas: Array<string> = [];

  constructor() { }

  buscar(event: any) {
    const valor = event.detail.value;
    
  }

}
