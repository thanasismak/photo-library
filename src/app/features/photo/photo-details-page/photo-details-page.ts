import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details-page',
  imports: [],
  templateUrl: './photo-details-page.html',
  styleUrl: './photo-details-page.scss'
})
export class PhotoDetailsPage {
  private route = inject(ActivatedRoute);
  // constructor(public fav: FavoritesService, private photos: PhotoService) { }
  // get id() { return this.route.snapshot.paramMap.get('id')!; }
  // src(id: string) { return this.photos.getImageUrlById(id, { w: 1600, h: 1200 }); }
  // toggle(id: string) { this.fav.toggle(id); }
}
