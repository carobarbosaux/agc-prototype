import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly state = inject(AppStateService);
  readonly router = inject(Router);

  get currentRoute(): string {
    return this.router.url.replace('/', '').split('?')[0] || 'herramientas';
  }

  get isHerramientas(): boolean {
    return this.router.url.includes('herramientas');
  }
}
