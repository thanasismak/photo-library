import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo, PhotoService } from '../../../core/services/photo.service';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [CommonModule, PhotoCard],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss'
})
export class FavoritePage {
  private readonly favoritesService = inject(FavoritesService);
  private readonly photoService = inject(PhotoService);

  favorites = computed(() => this.favoritesService.favorites());

  photoSrc(id: string) { return this.photoService.getImageUrlById(id, { w: 400, h: 300 }); }

  toggle(photo: Photo) { this.favoritesService.toggle(photo); }

  clearAll() { this.favoritesService.clearAll(); }
}
