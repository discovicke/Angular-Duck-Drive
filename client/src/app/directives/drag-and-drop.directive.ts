import {Directive, HostListener, signal, output, ElementRef, inject} from '@angular/core';
import { DragOverlayComponent } from '../components/drag-overlay/drag-overlay.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import {MainviewComponent} from '../mainview/mainview.component';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {

  private elementRef = inject(ElementRef);
  private overlay = inject(Overlay);
  fileDropped = output<File>();
  private overlayRef: OverlayRef | null = null;
  portal = new ComponentPortal(DragOverlayComponent);

  @HostListener('dragover', ['$event'])
  handleOnDragover(event: DragEvent): void {
    event.preventDefault();

    if (!this.overlayRef) {

    }
    console.log('nu drar jag över');
  }

  @HostListener('dragleave', ['$event'])
  handleLeave(event: DragEvent): void {
    event.preventDefault();
    console.log('nu drar jag iväg');
  }

  @HostListener('drop', ['$event'])
  handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    console.log('nu släpper jag');
    if (file) {
      this.fileDropped.emit(file);
    }
  }
}
