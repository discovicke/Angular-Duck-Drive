import { Component } from '@angular/core';
import {Overlay} from '@angular/cdk/overlay';

@Component({
  selector: 'app-drag-overlay',
  standalone: true,
  template: `
<div class="drag-overlay-content">
  <p>Släpp filen här</p>
</div>`,
  styleUrl: './drag-overlay.component.scss',
})
export class DragOverlayComponent {

  constructor(private overlay: Overlay) {
  }

}
