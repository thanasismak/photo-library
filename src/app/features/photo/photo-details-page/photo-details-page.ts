import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo, PhotoService } from '../../../core/services/photo.service';
import { MatIconModule } from '@angular/material/icon';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialog } from '@angular/material/dialog';
import { PhotoInfoDialog } from '../../../shared/components/photo-info-dialog/photo-info-dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-details-page',
  standalone: true,
  imports: [RouterModule, MatIconModule, PhotoCard, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './photo-details-page.html',
  styleUrl: './photo-details-page.scss'
})
export class PhotoDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly photoService = inject(PhotoService);
  private readonly dialog = inject(MatDialog);
  readonly favoriteService = inject(FavoritesService);

  readonly loading = signal(true);
  readonly photo = signal<Photo>([] as unknown as Photo);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { return; }
    const cached = this.photoService.getPhotoFromStore(id);
    if (cached) this.photo.set(cached);
    else this.photoService.getPhotoById(id).subscribe({
      next: photo => this.photo.set(photo),
      error: err => console.log('Error loading photo details', err)
    }).add(() => this.loading.set(false));
    this.loading.set(false);
  }

  openInfoDialog(): void {
    if (!this.photo()) return;
    this.dialog.open(PhotoInfoDialog, {
      data: this.photo(),
      width: '320px',
    });
  }
}
