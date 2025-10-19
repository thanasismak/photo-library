import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { Photo, PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { InfiniteScrollDirective } from '../../../shared/directives/infinite-scroll.directive';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-photo-gallery-page',
  standalone: true,
  imports: [MatProgressSpinnerModule, PhotoCard, InfiniteScrollDirective],
  templateUrl: './photo-gallery-page.html',
  styleUrl: './photo-gallery-page.scss'
})
export class PhotoGalleryPage implements OnInit {
  private readonly photoService = inject(PhotoService);
  readonly favoriteService = inject(FavoritesService);

  readonly items = signal<Photo[]>([]);
  readonly loading = signal(false);
  private page = signal(1);

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore() {
    if (this.loading()) return;
    this.loading.set(true);

    this.photoService.getPhotos(this.page())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: batch => {
          this.page.update(p => p + 1);
          this.items.update(prev => [...prev, ...batch]);
          this.photoService.appendPhotos(this.items());
        },
        error: err => console.log('Error loading photos', err)
      })
  }

  isFavorite(photoId: string): boolean {
    return this.favoriteService.isFavorite(photoId);
  }

  toggleFavorite(photo: Photo): void {
    this.favoriteService.toggle(photo);
  }
}
