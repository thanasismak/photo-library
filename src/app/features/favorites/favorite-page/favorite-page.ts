import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-favorite-page',
  imports: [CommonModule],
  templateUrl: './favorite-page.html',
  styleUrl: './favorite-page.scss'
})
export class FavoritePage {
  // ids = computed(() => [...this.fav.ids().values()]);
  // constructor(private fav: FavoritesService, private photos: PhotoService) { }

  track = (_: number, id: string) => id;
  // toggle(id: string) { this.fav.toggle(id); }
  // photoSrc(id: string) { return this.photos.getImageUrlById(id, { w: 400, h: 300 }); }
}
