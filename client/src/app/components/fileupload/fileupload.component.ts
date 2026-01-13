import {Component, inject} from '@angular/core';
import {FileHandlingService} from '../../services/file-handling.service';

@Component({
  selector: 'app-fileupload',
  imports: [],
  template: `
    <input type="file" id="myFile" (change)="onFileSelected($event)" name="myFile">
  `,

  styleUrls: ['./fileupload.component.scss'],
})
export class FileuploadComponent {
  private fileHandlingServiceInjection = inject(FileHandlingService);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileHandlingServiceInjection.content.set(file);
    this.fileHandlingServiceInjection.uploadFile(file).then(r => console.log(r));
    console.log(file);
  }
}
