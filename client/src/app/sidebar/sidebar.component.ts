import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  template: `
    <nav>
      <button class="new-button"> + Nytt</button>  
      <button
        *ngFor="let item of navItems"
        [ngClass]="item.cssClass">
        {{ item.icon + item.label }}
      </button>
    </nav>
    <hr/>
    <p>0 byte av 15 GB används</p>
    <button class ="get-storage">Få mer lagringsutrymme</button>
  `,
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  protected navItems = [
    { label: 'Startsida', cssClass: 'home-page', icon: '🏠' },
    { label: 'Min enhet', cssClass: 'my-unit', icon: '📱' },
    { label: 'Datorer', cssClass: 'computers', icon: '💻' },
    { label: 'Delas med mig', cssClass: 'shared-with-me', icon: '👫' },
    { label: 'Senaste', cssClass: 'latest', icon: '🕝' },
    { label: 'Stjärnmärkt', cssClass: 'marked', icon: '⭐️' },
    { label: 'Skräppost', cssClass: 'trash', icon: '⚠️' },
    { label: 'Papperskorg', cssClass: 'bin', icon: '🗑️' },
    { label: 'Lagring', cssClass: 'storage', icon: '☁️' },
  ]
}
