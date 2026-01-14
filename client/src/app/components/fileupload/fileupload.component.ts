import { Component, inject } from '@angular/core';
import { FileHandlingService } from '../../services/file-handling.service';

@Component({
  selector: 'app-fileupload',
  imports: [],
  template: ` <input type="file" id="myFile" name="myFile" /> `,

  styleUrls: ['./fileupload.component.scss'],
})
export class FileuploadComponent {
  private fileService = inject(FileHandlingService);


}
