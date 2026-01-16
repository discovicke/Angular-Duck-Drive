import { Directive, EventEmitter, HostListener, Output, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  @Output() fileDropped = new EventEmitter<File>();
  @Output() dragOver = new EventEmitter<void>();
  @Output() dragLeave = new EventEmitter<void>();

  private elementRef = inject(ElementRef);
  private isDragging = false;

  @HostListener('document:dragenter', ['$event'])
  onDocumentDragEnter(event: DragEvent): void {
    event.preventDefault();
    const isOverHost = this.elementRef.nativeElement.contains(event.target as Node);
    const isOverOverlay = (event.target as HTMLElement)?.closest('.cdk-overlay-container');

    if ((isOverHost || isOverOverlay) && !this.isDragging) {
      this.isDragging = true;
      this.dragOver.emit();
    }
  }

  @HostListener('document:dragover', ['$event'])
  onDocumentDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  @HostListener('document:dragleave', ['$event'])
  onDocumentDragLeave(event: DragEvent): void {
    event.preventDefault();
    const relatedTarget = event.relatedTarget as Node | null;
    const isLeavingToHost = relatedTarget && this.elementRef.nativeElement.contains(relatedTarget);
    const isLeavingToOverlay = relatedTarget && (relatedTarget as HTMLElement)?.closest?.('.cdk-overlay-container');

    if (!relatedTarget || (!isLeavingToHost && !isLeavingToOverlay)) {
      if (this.isDragging) {
        this.isDragging = false;
        this.dragLeave.emit();
      }
    }
  }

  @HostListener('document:drop', ['$event'])
  onDocumentDrop(event: DragEvent): void {
    event.preventDefault();
    const isOverHost = this.elementRef.nativeElement.contains(event.target as Node);
    const isOverOverlay = (event.target as HTMLElement)?.closest('.cdk-overlay-container');

    if (isOverHost || isOverOverlay) {
      this.isDragging = false;
      const files = event.dataTransfer?.files;
      if (files && files.length > 0) {
        this.fileDropped.emit(files[0]);
      }
    }
  }
}
