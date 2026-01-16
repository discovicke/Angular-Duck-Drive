import { Component } from '@angular/core';

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

}
