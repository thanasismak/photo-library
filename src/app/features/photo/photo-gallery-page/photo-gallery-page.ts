import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { Photo, PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';

@Component({
  selector: 'app-photo-gallery-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, PhotoCard],
  templateUrl: './photo-gallery-page.html',
  styleUrl: './photo-gallery-page.scss'
})
export class PhotoGalleryPage implements OnInit {
  private readonly photoServeice = inject(PhotoService);
  private readonly favoritesService = inject(FavoritesService);

  readonly items = signal<Photo[]>([]);
  readonly loading = signal(false);

  private page = signal(1);
  private readonly pageSize = 10;

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    if (this.loading()) { return; }
    this.loading.set(true);

    this.photoServeice.getPhotos(this.page(), this.pageSize).subscribe({
      next: batch => {
        this.items.update(prev => [...prev, ...batch]);
        this.page.update(p => p + 1);
      },
      error: err => console.log('Error loading photos', err),
      complete: () => this.loading.set(false)
    })
  }

  isFavorite(photoId: string): boolean {
    return this.favoritesService.isFavorite(photoId);
  }

  toggleFavorite(photo: Photo): void {
    this.favoritesService.toggle(photo);
  }
}
