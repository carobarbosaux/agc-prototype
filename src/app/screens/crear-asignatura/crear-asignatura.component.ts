import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-crear-asignatura',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-8"><h1>Crear Asignatura — en construcción</h1></div>`,
})
export class CrearAsignaturaComponent {
  readonly state = inject(AppStateService);
}
