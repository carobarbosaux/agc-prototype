import {
  Component,
  Output,
  EventEmitter,
  signal,
  computed,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhIconComponent } from '../../icons/ph-icon.component';
import { ProdiMarkComponent } from '../prodi-logo/prodi-logo.component';
import { onboardingSlides, OnboardingSlide } from '../../data/onboarding-prodi.data';

@Component({
  selector: 'app-onboarding-prodi',
  standalone: true,
  imports: [CommonModule, PhIconComponent, ProdiMarkComponent],
  templateUrl: './onboarding-prodi.component.html',
})
export class OnboardingProdiComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();
  @Output() openAssistant = new EventEmitter<void>();

  slideIndex = signal(0);
  exiting = signal(false);

  // Animation state for VisualContextualSelection
  showMenu = signal(false);
  activeAction = signal<number | null>(null);
  private menuTimer: ReturnType<typeof setTimeout> | null = null;
  private actionTimer: ReturnType<typeof setTimeout> | null = null;

  readonly slides = onboardingSlides;

  readonly slide = computed<OnboardingSlide>(() => this.slides[this.slideIndex()]);
  readonly isFirst = computed(() => this.slideIndex() === 0);
  readonly isLast = computed(() => this.slideIndex() === this.slides.length - 1);

  readonly progressPercent = computed(
    () => ((this.slideIndex() + 1) / this.slides.length) * 100
  );

  // VisualContextualSelection actions data
  readonly contextualActions = [
    { label: 'Corregir redacción',    color: '#367CFF' },
    { label: 'Expandir o resumir',     color: '#367CFF' },
    { label: 'Regenerar texto',        color: '#7C3AED' },
    { label: 'Buscar bibliografía',    color: '#24A859' },
    { label: 'Deep research',          color: '#D97706' },
  ];

  // VisualFinalState caps data
  readonly finalCaps = [
    { label: 'Generar', desc: 'contenido desde cero' },
    { label: 'Editar',  desc: 'y mejorar fragmentos' },
    { label: 'Revisar', desc: 'calidad y coherencia' },
  ];

  // Sidebar items for VisualCanvasOverview
  readonly canvasSidebarItems = ['Índice', 'Tema 1', 'Tema 2', 'Tema 3'];

  ngOnInit(): void {
    this.startContextualAnimation();
  }

  ngOnDestroy(): void {
    this.clearContextualTimers();
  }

  private startContextualAnimation(): void {
    this.menuTimer = setTimeout(() => this.showMenu.set(true), 600);
    this.actionTimer = setTimeout(() => this.activeAction.set(0), 1200);
  }

  private clearContextualTimers(): void {
    if (this.menuTimer) clearTimeout(this.menuTimer);
    if (this.actionTimer) clearTimeout(this.actionTimer);
  }

  onSlideChange(index: number): void {
    this.clearContextualTimers();
    this.showMenu.set(false);
    this.activeAction.set(null);
    this.slideIndex.set(index);
    if (this.slides[index].visualType === 'contextual-selection') {
      this.startContextualAnimation();
    }
  }

  goNext(): void {
    if (this.isLast()) return;
    this.onSlideChange(this.slideIndex() + 1);
  }

  goBack(): void {
    if (this.isFirst()) return;
    this.onSlideChange(this.slideIndex() - 1);
  }

  handleClose(): void {
    this.exiting.set(true);
    setTimeout(() => this.close.emit(), 200);
  }

  handleCta(): void {
    this.handleClose();
    this.openAssistant.emit();
  }

  getStepLabel(slide: OnboardingSlide, i: number): string {
    return slide.title || slide.stepLabel || `Paso ${i + 1}`;
  }

  isPast(i: number): boolean {
    return i < this.slideIndex();
  }

  isActive(i: number): boolean {
    return i === this.slideIndex();
  }
}
