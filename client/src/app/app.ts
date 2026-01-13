import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import type { FileDto } from '../../../shared/file-metadata.dto';
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, AsideComponent],
  template: `
    <div class="app-layout">
      <app-header></app-header>
      <app-sidebar></app-sidebar>

      <main class="main">
        <router-outlet></router-outlet>
      </main>
      <app-aside></app-aside>
    </div>
  `,
  styleUrls: ['./app.scss'],
})
export class App {
  /*
  constructor() {
    this.logMessage();
  }
  
  async getAllFiles(): Promise<FileDto[]> {
    const data = await fetch('/api/files');
    console.log('App component initialized');
    return data.json() as Promise<FileDto[]>;
  }

  async logMessage(): Promise<void> {
    const resultat = await this.getAllFiles();
    console.log('Fetched files:', resultat);
  }
    */
}
