import { Component } from '@angular/core';
import {SearchbarComponent} from '../components/searchbar/searchbar.component';

@Component({
  selector: 'app-header',
  imports: [SearchbarComponent],
  template: `
  <header>
    <img class="brand-logo" src="assets/duck-drive-icon.png" alt="logo" aria-hidden="true" />
    <h1>Drive</h1>
    <app-searchbar></app-searchbar>
  </header>
    `,
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

}
