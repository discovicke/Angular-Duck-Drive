import { Component, inject } from '@angular/core';
import { FilerowComponent } from '../components/filerow/filerow.component';
import { FileHandlingService } from '../services/file-handling.service';

@Component({
  selector: 'app-mainview',
  imports: [FilerowComponent],
  template: `
    <div class="mainview">
      <div class="file-list-header">
        <span class="header-name">Namn</span>
        <span class="header-owner">Ägare</span>
        <span class="header-date">Uppladdad</span>
        <span class="header-date">Ändrad</span>
        <span class="header-size">Storlek</span>
        <span class="header-action"></span>
      </div>
      <div class="file-list">
        @for (filerow of FileService.filesList(); track filerow.fileName) {
          <app-filerow
            [fileName]="filerow.fileName"
            [ownerName]="filerow.ownerName"
            [uploadedAt]="filerow.uploadedAt"
            [editedAt]="filerow.editedAt"
            [sizeInBytes]="filerow.sizeInBytes"
          ></app-filerow>
        }
      </div>
    </div>
  `,
  styleUrl: './mainview.component.scss',
})
export class MainviewComponent {
  FileService = inject(FileHandlingService);
}
