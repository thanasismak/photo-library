import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo } from '../../../core/services/photo.service';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [RouterModule, CommonModule, PhotoCard, MatIconModule],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss'
})
export class FavoritePage {
  readonly favoritesService = inject(FavoritesService);

  favorites = computed(() => this.favoritesService.favorites());

  toggle(photo: Photo) { this.favoritesService.toggle(photo); }

  clearAll() { this.favoritesService.clearAll(); }
}
