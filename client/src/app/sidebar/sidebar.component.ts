import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';

@Component({
  selector: 'app-sidebar',
  imports: [NavButtonComponent],
  template: `
    <nav>
      <button class="new-button"> + Nytt</button>
      @for (item of navItems; track item.label) {
        <app-nav-button
          [label]="item.label"
          [icon]="item.icon"
          [cssClass]="item.cssClass"
        />
      }
    </nav>
    <hr/>
    <p>0 av 15 GB används</p>
    <button class="get-storage">Få mer lagringsutrymme</button>
  `,
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected readonly navItems = [
    { label: 'Startsida', cssClass: 'home-page', icon: 'home' },
    { label: 'Min enhet', cssClass: 'my-unit', icon: 'my-unit' },
    { label: 'Datorer', cssClass: 'computers', icon: 'computer' },
    { label: 'Delas med mig', cssClass: 'shared-with-me', icon: 'shared-with-me' },
    { label: 'Senaste', cssClass: 'latest', icon: 'latest' },
    { label: 'Stjärnmärkt', cssClass: 'marked', icon: 'marked' },
    { label: 'Skräppost', cssClass: 'trash', icon: 'trash' },
    { label: 'Papperskorg', cssClass: 'bin', icon: 'bin' },
    { label: 'Lagring', cssClass: 'storage', icon: 'storage' },
  ];
}
