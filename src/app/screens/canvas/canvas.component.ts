import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-8"><h1>Canvas — en construcción</h1></div>`,
})
export class CanvasComponent {
  readonly state = inject(AppStateService);
}
