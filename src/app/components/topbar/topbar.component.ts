import {
  Component,
  Input,
  Output,
  EventEmitter,
  signal,
  inject,
  OnChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { ProdiWordmarkComponent } from '../prodi-logo/prodi-logo.component';
import { roles } from '../../mock-data';

/** A single crumb rendered in the Topbar breadcrumb trail. */
export interface BreadcrumbItem {
  /** Display text. */
  label: string;
  /** Optional Angular router path to navigate to on click. */
  route?: string;
  /** Custom click handler — takes precedence over `route`. */
  onClick?: () => void;
}

interface RolColorSet {
  bg: string;
  text: string;
  border: string;
  hoverBg: string;
}

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, NgStyle, PhIconComponent, ProdiWordmarkComponent],
  templateUrl: './topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Application-wide top navigation bar.
 *
 * Displays the Prodi wordmark, a breadcrumb trail, a role-switching button,
 * and a notification bell. Emits output events instead of navigating directly
 * so that parent screens retain control over side-effects.
 */
export class TopbarComponent implements OnChanges {
  /** Breadcrumb items to render. Updated via `ngOnChanges` to reset hover state. */
  @Input() breadcrumb: BreadcrumbItem[] = [];
  /** Currently active role ID; drives button colour and dropdown selection. */
  @Input() rolActivo: string = 'autor';
  /** Number of unread notifications shown on the bell badge. */
  @Input() notifCount: number = 0;

  @Output() rolChange = new EventEmitter<string>();
  @Output() notifClick = new EventEmitter<void>();
  @Output() logoClick = new EventEmitter<void>();

  readonly roles = roles;

  rolMenuAbierto = signal(false);
  rolBtnHover = false;
  breadcrumbHover: boolean[] = [];

  readonly rolColors: Record<string, RolColorSet> = {
    autor: { bg: '#F9FCFF', text: '#0A5CF5', border: '#0A5CF5', hoverBg: '#E6EFFF' },
    coordinador: { bg: '#F0FDF4', text: '#10B981', border: '#A7F3D0', hoverBg: '#DCFCE7' },
    editor: { bg: '#FFFBEB', text: '#F59E0B', border: '#FDE68A', hoverBg: '#FEF3C7' },
    disenador: { bg: '#E7EFFE', text: '#073676', border: '#BAD2FF', hoverBg: '#D1E3FF' },
  };

  get rolActualLabel(): string {
    return this.roles.find(r => r.id === this.rolActivo)?.label ?? 'Autor';
  }

  private router = inject(Router);

  ngOnChanges(): void {
    // Keep breadcrumbHover array in sync with breadcrumb length
    this.breadcrumbHover = this.breadcrumb.map(() => false);
  }

  /** Compute inline styles for the role button, taking hover state into account. */
  getRolButtonStyle(): Record<string, string> {
    const rc = this.rolColors[this.rolActivo] ?? this.rolColors['autor'];
    const bg = this.rolBtnHover ? rc.hoverBg : rc.bg;
    return {
      background: bg,
      color: rc.text,
      border: `1px solid ${rc.border}`,
    };
  }

  /** Emit the new role and close the dropdown. */
  selectRol(rolId: string): void {
    this.rolChange.emit(rolId);
    this.rolMenuAbierto.set(false);
  }

  /** Handle a breadcrumb click: invoke custom handler or navigate by route. */
  onBreadcrumbClick(item: BreadcrumbItem): void {
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }
}
