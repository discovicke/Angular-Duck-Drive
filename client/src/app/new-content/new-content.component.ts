import { Component } from '@angular/core';
import { FileuploadComponent } from '../components/fileupload/fileupload.component';
import { FileHandlingService } from '../services/file-handling.service';

@Component({
  selector: 'app-new-content',
  imports: [],
  template: ` <div>
    <select name="new-content" class="new-content">
      <option value="">Ladda upp ny mapp</option>
      <option (click)="onClick()" value="">Ladda upp ny fil</option>
    </select>
  </div>`,
  styleUrls: ['./new-content.component.scss'],
})
export class NewContentComponent {
  private fileService = new FileHandlingService();

  onClick(): void {
    const input = document.createElement('input'); // This createElement use is approved by Oscar!
    input.type = 'file';
    input.style.display = 'none';
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
    const fileToReturn: File | null = input.files ? input.files[0] : null;
    this.fileService.onFileSelected(fileToReturn);
  }
}
