import { Component, inject, OnDestroy } from '@angular/core';
import { FilerowComponent } from '../components/filerow/filerow.component';
import { FileHandlingService } from '../services/file-handling.service';
import { DragAndDropDirective } from '../directives/drag-and-drop.directive';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DragOverlayComponent } from '../components/drag-overlay/drag-overlay.component';

@Component({
  selector: 'app-mainview',
  imports: [FilerowComponent, DragAndDropDirective],
  template: `
    <div
      class="mainview"
      appDragAndDrop
      (fileDropped)="onFileDropped($event)"
      (dragOver)="onDragOver()"
      (dragLeave)="onDragLeave()"
    >
      @if (FileService.filesList().length > 0) {
        <div class="file-list-header">
          <span class="header-name">Namn</span>
          <span class="header-owner">Ägare</span>
          <span class="header-date" id="headerUploadedAt">Uppladdad</span>
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
      } @else {
        <div class="empty-state">
          <img [src]="randomEmptyStateImage" alt="Inga filer" />
          <p>Ooops... Inga filer att visa!</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./mainview.component.scss'],
})
export class MainviewComponent implements OnDestroy {
  FileService = inject(FileHandlingService);
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  onDragOver(): void {
    if (this.overlayRef) return;

    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'drag-overlay-backdrop',
      panelClass: 'drag-overlay-panel',
    });

    const portal = new ComponentPortal(DragOverlayComponent);
    this.overlayRef.attach(portal);
  }

  onDragLeave(): void {
    this.closeOverlay();
  }

  onFileDropped(fileReceived: File): void {
    this.closeOverlay();
    this.FileService.uploadFile(fileReceived);
  }

  private closeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy(): void {
    this.closeOverlay();
  }

  private emptyStateImages = [
    'assets/empty-state-1.png',
    'assets/empty-state-2.png',
    'assets/empty-state-3.png',
  ];

  randomEmptyStateImage = this.emptyStateImages[
    Math.floor(Math.random() * this.emptyStateImages.length)
    ];
}
