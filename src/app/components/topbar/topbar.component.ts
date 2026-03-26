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

export interface BreadcrumbItem {
  label: string;
  route?: string;
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
export class TopbarComponent implements OnChanges {
  @Input() breadcrumb: BreadcrumbItem[] = [];
  @Input() rolActivo: string = 'autor';
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

  getRolButtonStyle(): Record<string, string> {
    const rc = this.rolColors[this.rolActivo] ?? this.rolColors['autor'];
    const bg = this.rolBtnHover ? rc.hoverBg : rc.bg;
    return {
      background: bg,
      color: rc.text,
      border: `1px solid ${rc.border}`,
    };
  }

  selectRol(rolId: string): void {
    this.rolChange.emit(rolId);
    this.rolMenuAbierto.set(false);
  }

  onBreadcrumbClick(item: BreadcrumbItem): void {
    if (item.onClick) {
      item.onClick();
    } else if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }
}
