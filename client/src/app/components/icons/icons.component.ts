import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconService } from './icons.service';

@Component({
  selector: 'app-icon',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="icon" [innerHTML]="svg()"></span>`,
  styleUrls: ['./icons.component.scss'],
})
export class IconsComponent {
  private readonly iconService = inject(IconService);

  readonly name = input<string | undefined>();

  readonly svg = computed<SafeHtml | null>(() => {
    const iconName = this.name();
    return iconName ? this.iconService.get(iconName) : null;
  });
}
