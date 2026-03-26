import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppStateService } from './services/app-state.service';

/**
 * Root application shell.
 *
 * Renders the Angular router outlet and hosts the global AppStateService.
 * Route-level components are lazy-loaded via app.routes.ts.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly state = inject(AppStateService);
  private readonly router = inject(Router);

  /** Active route slug derived from the current URL (falls back to 'herramientas'). */
  get currentRoute(): string {
    return this.router.url.replace('/', '').split('?')[0] || 'herramientas';
  }

  /** Whether the current route is the tools-hub landing page. */
  get isHerramientas(): boolean {
    return this.router.url.includes('herramientas');
  }
}
