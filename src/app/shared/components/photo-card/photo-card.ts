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
  readonly favoritesService = inject(FavoritesService);
  readonly router = inject(Router);
  photo = input.required<Photo>();           
  isFavorite = input<boolean>(false);
  isGalleryView = computed(() => this.router.url.endsWith('photos'));
  toggleFavorite = output<Photo>(); 
}
