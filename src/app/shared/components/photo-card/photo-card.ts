import { Component, computed, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo } from '../../../core/services/photo.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [MatIconModule, RouterModule, MatButtonModule],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss'
})
export class PhotoCard {
  readonly favoriteService = inject(FavoritesService);
  readonly router = inject(Router);
  
  photo = input.required<Photo>();
  isFavorite = input<boolean>(false);
  isGalleryView = computed(() => {
    console.log(this.router.url.endsWith('photos') || this.router.url.endsWith('favorites'))
    return this.router.url.endsWith('photos') || this.router.url.endsWith('favorites')
  });
  toggleFavorite = output<Photo>();
}
