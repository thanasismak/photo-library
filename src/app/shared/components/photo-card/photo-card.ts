import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
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

  id = input.required<string>();
  src = input<string>();
  toggleFavorite() {
    this.favoritesService.toggle({ id: this.id() } as Photo);
  }
}
