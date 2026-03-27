import {
  Component,
  Input,
  signal,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: inline-flex; align-items: center; position: relative; }
  `],
  template: `
    <div
      #trigger
      style="display:inline-flex;align-items:center;position:relative"
      (mouseenter)="show()"
      (mouseleave)="hide()"
    >
      <ng-content />

      @if (visible()) {
        <div
          [style]="getTooltipStyle()"
          style="position:absolute;z-index:99999;pointer-events:none;white-space:nowrap"
        >
          <div style="background:#001D52;border-radius:8px;padding:6px 10px;color:#FFFFFF;font-size:12px;font-family:'Proeduca Sans',system-ui,sans-serif;font-weight:400">
            {{ text }}
          </div>
        </div>
      }
    </div>
  `,
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() side: TooltipSide = 'right';

  @ViewChild('trigger') triggerRef!: ElementRef<HTMLDivElement>;

  visible = signal(false);

  private readonly GAP = 8;

  show(): void {
    this.visible.set(true);
  }

  hide(): void {
    this.visible.set(false);
  }

  getTooltipStyle(): Record<string, string> {
    // Position relative to the trigger using CSS transforms
    // Since we're inside the trigger div (position:relative), we use absolute positioning
    switch (this.side) {
      case 'top':
        return {
          bottom: `calc(100% + ${this.GAP}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          top: `calc(100% + ${this.GAP}px)`,
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          right: `calc(100% + ${this.GAP}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
      case 'right':
      default:
        return {
          left: `calc(100% + ${this.GAP}px)`,
          top: '50%',
          transform: 'translateY(-50%)',
        };
    }
  }
}
