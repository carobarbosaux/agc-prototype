import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { calidadContenidosIndicadores } from '../../mock-data';

interface CardConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  getValue: (d: typeof calidadContenidosIndicadores) => string | number;
  suffix: string;
  description: string;
  urgente: boolean;
}

const CARDS_CONFIG: CardConfig[] = [
  {
    id: 'alertas',
    label: 'Alertas normativas',
    icon: 'Warning',
    color: '#F97316',
    bgColor: '#FFF7ED',
    borderColor: '#FED7AA',
    getValue: (d) => d.alertasNormativas,
    suffix: '',
    description: 'requieren revisión',
    urgente: true,
  },
  {
    id: 'revision',
    label: 'Revisión profunda',
    icon: 'ArrowsClockwise',
    color: '#367CFF',
    bgColor: '#E7EFFE',
    borderColor: '#BAD2FF',
    getValue: (d) => `${d.revisionProfunda}%`,
    suffix: '',
    description: 'completado',
    urgente: false,
  },
  {
    id: 'ise',
    label: 'ISE medio ponderado',
    icon: 'ChartBar',
    color: '#10B981',
    bgColor: '#F0FDF4',
    borderColor: '#A7F3D0',
    getValue: (d) => d.iseMediaPonderado.toFixed(1),
    suffix: '/5',
    description: 'valoración media',
    urgente: false,
  },
  {
    id: 'critico',
    label: 'Estado crítico',
    icon: 'Fire',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
    getValue: (d) => d.asignaturasEstadoCritico,
    suffix: '',
    description: 'asignaturas bloqueadas',
    urgente: true,
  },
];

@Component({
  selector: 'app-calidad-contenidos-cards',
  standalone: true,
  imports: [CommonModule, PhIconComponent],
  template: `
    <div class="grid grid-cols-4 gap-4">
      @for (card of cards; track card.id) {
        <div
          class="rounded-xl p-4 cursor-pointer transition-all"
          [ngStyle]="{
            background: card.bgColor,
            border: '1px solid ' + card.borderColor
          }"
          (click)="onCardClick.emit(card.id)"
          (mouseenter)="hoveredCard = card.id"
          (mouseleave)="hoveredCard = null"
        >
          <!-- Icon + urgente indicator -->
          <div class="flex items-start justify-between mb-3">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center"
              [ngStyle]="{ background: card.color + '1A' }"
            >
              <ph-icon [name]="card.icon" [size]="18" [ngStyle]="{ color: card.color }" />
            </div>
            @if (card.urgente) {
              <span
                class="text-xs font-medium px-1.5 py-0.5 rounded"
                [ngStyle]="{ background: card.color + '22', color: card.color }"
              >
                Urgente
              </span>
            }
          </div>

          <!-- Value -->
          <div class="flex items-baseline gap-0.5 mb-1">
            <span
              class="text-2xl font-bold"
              [ngStyle]="{ color: card.color, fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif' }"
            >
              {{ getValue(card) }}
            </span>
            @if (card.suffix) {
              <span class="text-sm font-medium text-slate-500">{{ card.suffix }}</span>
            }
          </div>

          <!-- Label -->
          <p class="text-sm font-semibold text-slate-700 mb-0.5">{{ card.label }}</p>

          <!-- Description -->
          <p class="text-xs text-slate-500">{{ card.description }}</p>
        </div>
      }
    </div>
  `,
})
export class CalidadContenidosCardsComponent {
  @Output() onCardClick = new EventEmitter<string>();

  readonly cards = CARDS_CONFIG;
  readonly indicadores = calidadContenidosIndicadores;

  hoveredCard: string | null = null;

  getValue(card: CardConfig): string | number {
    return card.getValue(this.indicadores);
  }
}
