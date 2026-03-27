import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhIconComponent } from '../../../../icons/ph-icon.component';
import { GravedadTagComponent } from '../../atoms/gravedad-tag/gravedad-tag.component';
import { gravedadConfig } from '../../../../mock-data';

export interface ComentarioRespuesta {
  autor: string;
  texto: string;
}

export interface Comentario {
  id: string;
  avatar: string;
  autor: string;
  rol: string;
  timestamp: string;
  gravedad: string;
  texto: string;
  resuelto: boolean;
  respuestas?: ComentarioRespuesta[];
}

@Component({
  selector: 'app-comentario-hilo',
  standalone: true,
  imports: [CommonModule, FormsModule, PhIconComponent, GravedadTagComponent],
  template: `
    <div
      class="rounded-xl p-4 transition-all"
      [class.opacity-60]="comentario.resuelto"
      [ngStyle]="{
        background: comentario.resuelto ? 'var(--color-bg)' : (gravedadBg || 'var(--color-surface)'),
        border: '1px solid ' + (comentario.resuelto ? 'var(--color-border)' : (gravedadBorder || 'var(--color-border)'))
      }"
    >
      <!-- Header -->
      <div class="flex items-start justify-between gap-2 mb-3">
        <div class="flex items-center gap-2">
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            [ngStyle]="{ background: 'var(--color-text-muted)' }"
          >
            {{ comentario.avatar }}
          </div>
          <div>
            <p class="text-sm font-medium text-slate-700">{{ comentario.autor }}</p>
            <p class="text-xs text-slate-500">{{ comentario.rol }} · {{ comentario.timestamp }}</p>
          </div>
        </div>
        <app-gravedad-tag [gravedad]="comentario.gravedad" size="sm" />
      </div>

      <!-- Body -->
      <p class="text-sm text-slate-600 leading-relaxed mb-3">{{ comentario.texto }}</p>

      <!-- Respuestas -->
      @if (comentario.respuestas && comentario.respuestas.length > 0) {
        <div class="mt-3 pl-3 space-y-2" [ngStyle]="{ borderLeft: '2px solid var(--color-border)' }">
          @for (r of comentario.respuestas; track $index) {
            <div class="text-sm text-slate-600">
              <span class="font-medium text-slate-700 mr-1">{{ r.autor }}:</span>
              {{ r.texto }}
            </div>
          }
        </div>
      }

      <!-- Actions (not resolved) -->
      @if (!comentario.resuelto) {
        <div class="flex items-center gap-2 mt-3 pt-3" [ngStyle]="{ borderTop: '1px solid var(--color-surface-100)' }">
          <button
            (click)="onMarcarResuelto.emit(comentario.id)"
            class="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
            [ngStyle]="{ background: 'var(--color-success-bg)', color: 'var(--color-green-700)', border: '1px solid #A7F3D0' }"
          >
            <ph-icon name="CheckCircle" [size]="13" />
            Marcar como resuelto
          </button>
          <button
            (click)="toggleMostrarRespuesta()"
            class="text-xs text-slate-600 px-2 py-1.5 rounded-lg transition-colors"
            [ngStyle]="mostrarRespuesta ? { background: 'var(--color-bg)' } : {}"
          >
            Responder
          </button>
        </div>
      }

      <!-- Resolved indicator -->
      @if (comentario.resuelto) {
        <div class="flex items-center gap-1.5 mt-2 text-xs text-emerald-600">
          <ph-icon name="CheckCircle" [size]="12" />
          <span>Resuelto</span>
        </div>
      }

      <!-- Reply box -->
      @if (mostrarRespuesta && !comentario.resuelto) {
        <div class="mt-3">
          <textarea
            [(ngModel)]="respuesta"
            placeholder="Escribe tu respuesta..."
            class="w-full text-sm px-[13px] py-[9px] rounded-[10px] resize-none outline-none"
            [ngStyle]="{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-surface-300)',
              color: 'var(--color-text)',
              minHeight: '72px',
              fontFamily: '\\'Proeduca Sans\\', system-ui, sans-serif'
            }"
            rows="3"
          ></textarea>
          <div class="flex items-center gap-2 mt-2">
            <button
              (click)="handleResponder()"
              class="text-xs font-medium px-3 py-1.5 rounded-lg text-white"
              [ngStyle]="{ background: 'var(--color-primary)' }"
            >
              Enviar
            </button>
            <button
              (click)="mostrarRespuesta = false"
              class="text-xs text-slate-600 px-2 py-1.5 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
/**
 * @source      Figma — Prodi DS / Molecules / ComentarioHilo
 * @type        molecule
 * @composedOf  GravedadTag (atom)
 * @tokens      --color-error, --color-warning, --color-text-muted, --color-border
 * @figma       TBD
 *
 * Threaded comment card with gravedad indicator, author avatar, reply thread, and resolve action.
 */
/**
 * Renders a comment thread for a single content block.
 *
 * Displays all comments with their gravity badges, supports inline replies,
 * and provides a "marcar resuelto" action per comment.
 * Unresolved critical comments are highlighted.
 */
export class ComentarioHiloComponent {
  @Input() comentario!: Comentario;
  @Input() compact: boolean = false;

  @Output() onMarcarResuelto = new EventEmitter<string>();
  @Output() onResponder = new EventEmitter<{ id: string; respuesta: string }>();

  respuesta: string = '';
  mostrarRespuesta: boolean = false;

  private readonly gc: Record<string, any> = gravedadConfig as any;

  get gravedadBg(): string | null {
    return this.gc[this.comentario?.gravedad]?.bg ?? null;
  }

  get gravedadBorder(): string | null {
    return this.gc[this.comentario?.gravedad]?.border ?? null;
  }

  toggleMostrarRespuesta(): void {
    this.mostrarRespuesta = !this.mostrarRespuesta;
  }

  handleResponder(): void {
    if (!this.respuesta.trim()) return;
    this.onResponder.emit({ id: this.comentario.id, respuesta: this.respuesta });
    this.respuesta = '';
    this.mostrarRespuesta = false;
  }
}
