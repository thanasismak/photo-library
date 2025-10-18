import { Component, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";

interface Photo {
  id: string;
  src: string;
  alt: string;
  previewUrl: string;
}

@Component({
  selector: 'app-photo-gallery-page',
  imports: [MatProgressSpinnerModule, PhotoCard],
  templateUrl: './photo-gallery-page.html',
  styleUrl: './photo-gallery-page.scss'
})
export class PhotoGalleryPage {
  readonly loading = signal(false);
  private page = signal(1);
  readonly items = signal<Photo[]>([]);
  //interface
  // Photo
  // loadMore() {
  //   if (this.loading()) return;
  //   this.loading.set(true);
  //   this.api.fetchPage(this.page()).subscribe({
  //     next: batch => {
  //       this.items.set([...this.items(), ...batch]);
  //       this.page.update(x => x + 1);
  //     },
  //     complete: () => this.loading.set(false),
  //     error: () => this.loading.set(false)
  //   });
  // }
  //fav === favorite service
  isFavorite = (id: string) => { };
  toggle(id: string) { }
}
