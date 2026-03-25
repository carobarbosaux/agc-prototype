import { Component } from '@angular/core';
import { HerramientasComponent } from './herramientas/herramientas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HerramientasComponent],
  template: `<app-herramientas />`,
})
export class App {}
