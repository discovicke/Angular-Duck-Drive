import {Injectable, signal} from '@angular/core';
import { FileDto} from '../../../../shared/file-metadata.dto';

@Injectable({
  providedIn: 'root',
})
export class FileHandlingService {

  content = signal<File | null>(null);

  convertToBase64(content: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        console.log(resolve(base64));
      };
      reader.onerror = reject;
      reader.readAsDataURL(content);
    });
  }

  ConvertToFileDto (file: File): FileDto {
    return {
      fileName: file.name,
      ownerName: "Kalle Anka",
      fileBody: this.convertToBase64(file).toString(),
    };
  }

  /* API saker */

  uploadFile(file: File) {
    const fileDto = this.ConvertToFileDto(file);
    return fetch('/api/files/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fileDto),
    });
  }

  /*


  Metod som konverterar från bytes till fil-format

  Metod upload för att ladda upp fil - anropa PUT i API:n

  */

}
