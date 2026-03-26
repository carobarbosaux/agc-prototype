import { Component, Input, OnChanges, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PH_ICONS } from './ph-icons.map';

/**
 * Renders a Phosphor icon by name.
 * Usage: <ph-icon name="Bell" [size]="16" />
 * Names are PascalCase, matching the original @phosphor-icons/react API.
 */
@Component({
  selector: 'ph-icon',
  standalone: true,
  template: `<span style="display:inline-flex;align-items:center;line-height:0" [innerHTML]="svgContent"></span>`,
})
export class PhIconComponent implements OnChanges {
  @Input({ required: true }) name!: string;
  @Input() size: number = 16;

  svgContent: SafeHtml = '';

  private sanitizer = inject(DomSanitizer);

  ngOnChanges(): void {
    const raw = PH_ICONS[this.name];
    if (!raw) {
      this.svgContent = '';
      return;
    }
    // Patch width/height — the stored SVG has no width/height, only viewBox
    const sized = raw.replace('<svg ', `<svg width="${this.size}" height="${this.size}" `);
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(sized);
  }
}
