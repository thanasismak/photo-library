import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Photo } from '../../../core/services/photo.service';

@Component({
  selector: 'app-photo-info-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Photo Info</h2>
    <mat-dialog-content>
      <p><strong>Author:</strong> {{ dialogData.author }}</p>
      <p><strong>Dimensions:</strong> {{ dialogData.width }} × {{ dialogData.height }}</p>
      <p>
        <a [href]="dialogData.src" target="_blank" rel="noopener noreferrer">
          View on Unsplash
        </a>
      </p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class PhotoInfoDialog {
  readonly dialogData = inject(MAT_DIALOG_DATA) as Photo;
}
