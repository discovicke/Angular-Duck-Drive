import { Injectable, signal } from '@angular/core';
import { FileDto } from '../../../../shared/file-metadata.dto';

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
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(content);
    });
  }

  async convertToFileDto(file: File): Promise<FileDto> {
    const base64 = await this.convertToBase64(file);

    return {
      fileName: file.name,
      ownerName: 'Kalle Anka',
      fileBody: base64,
    };
  }

  /* API saker */

  async uploadFile(file: File) {
    const fileDto = await this.convertToFileDto(file);

    return fetch(`/api/files/${file.name}`, {
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
