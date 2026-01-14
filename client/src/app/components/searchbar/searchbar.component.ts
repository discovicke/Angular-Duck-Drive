import { Component, inject } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { FileHandlingService } from '../../services/file-handling.service';

@Component({
  selector: 'app-searchbar',
  imports: [IconsComponent],
  template: `
    <div class="searchbar">
      <span class="searchbar__icon" aria-hidden="true">
        <app-icon [name]="'search'"></app-icon>
      </span>
      <input
        class="searchbar__input"
        type="search"
        placeholder="Sök på Drive"
        aria-label="Search"
        (input)="onSearch($event.target.value)"
      />
    </div>
  `,
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  FileService = inject(FileHandlingService);

  onSearch(value: string) {
    this.FileService.searchAllFiles(value);
  }

}
