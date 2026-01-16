// TypeScript
import { Component, ChangeDetectionStrategy, inject, signal, computed, ViewChild } from '@angular/core';
import { NavButtonComponent } from '../components/nav-button/nav-button.component';
import { FileHandlingService } from '../services/file-handling.service';
import { NewContentComponent } from '../new-content/new-content.component';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

@Component({
  selector: 'app-sidebar',
  imports: [NavButtonComponent, NewContentComponent, FileSizePipe, PortalModule],
  template: `
    <nav>
      <app-nav-button
        label="Nytt"
        icon="plus"
        variant="primary"
        class="new-button"
        (click)="openNewContentDropdown()"
      />
      @for (item of navItems; track item.label) {
        <app-nav-button [label]="item.label" [icon]="item.icon" [class]="item.class"/>
      }
    </nav>
    <div class="storage-bar">
      <div class="storage-fill" [style.width.%]="storagePercentage()"></div>
    </div>
    <p>{{ fileService.usedStorageInBytes() | fileSizePipe }} av 15 GB används</p>
    <app-nav-button label="Få mer lagringsutrymme" variant="secondary" class="get-storage"/>

    <ng-template cdkPortal #newContentPortal>
      <app-new-content class="new-content-overlay"></app-new-content>
    </ng-template>
  `,
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @ViewChild(CdkPortal) portal!: CdkPortal;
  fileService = inject(FileHandlingService);
  private overlayRef: OverlayRef | null = null;

  storagePercentage = computed(() => {
    const maxStorageInBytes = 15 * 1024 * 1024 * 1024;
    const usedBytes = this.fileService.usedStorageInBytes();
    return Math.min((usedBytes / maxStorageInBytes) * 100, 100);
  });
  constructor(private overlay: Overlay) {}

  openNewContentDropdown() {
    if (!this.portal) {
      return;
    }

    const origin = document.querySelector('.new-button') as HTMLElement | null;
    if (!origin) {
      return;
    }

    if (this.overlayRef) {
      this.overlayRef.dispose();
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({
      height: 200,
      width: 200,
      panelClass: 'new-content-overlay',
      positionStrategy
    });
    this.overlayRef.attach(this.portal);
  }

  protected readonly navItems = [
    { label: 'Startsida', class: 'home-page', icon: 'home' },
    { label: 'Min enhet', class: 'my-unit', icon: 'my-unit' },
    { label: 'Datorer', class: 'computers', icon: 'computer' },
    { label: 'Delas med mig', class: 'shared-with-me', icon: 'shared-with-me' },
    { label: 'Senaste', class: 'latest', icon: 'latest' },
    { label: 'Stjärnmärkt', class: 'marked', icon: 'marked' },
    { label: 'Skräppost', class: 'trash', icon: 'trash' },
    { label: 'Papperskorg', class: 'bin', icon: 'bin' },
    { label: 'Lagring', class: 'storage', icon: 'storage' },
  ];
}
