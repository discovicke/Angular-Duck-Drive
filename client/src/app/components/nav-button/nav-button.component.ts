import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-nav-button',
  imports: [IconsComponent],
  template: `
    <button [class]="cssClass()" (click)="clicked.emit()">
      <app-icon [name]="icon()" />
      <span class="label">{{ label() }}</span>
    </button>
  `,
  styleUrl: './nav-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonComponent {
  label = input.required<string>();
  icon = input.required<string>();
  cssClass = input<string>('');
  clicked = output<void>();
}
