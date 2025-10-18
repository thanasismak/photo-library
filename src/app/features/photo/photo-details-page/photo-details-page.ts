import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites.service';
import { Photo, PhotoService } from '../../../core/services/photo.service';
import { MatIconModule } from '@angular/material/icon';
import { PhotoCard } from "../../../shared/components/photo-card/photo-card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-photo-details-page',
  standalone: true,
  imports: [MatIconModule, PhotoCard, MatProgressSpinnerModule],
  templateUrl: './photo-details-page.html',
  styleUrl: './photo-details-page.scss'
})
export class PhotoDetailsPage implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly favoritesService = inject(FavoritesService);
  private readonly photoService = inject(PhotoService);

  readonly loading = signal(true);
  readonly photo = signal<Photo | null>(null);

  readonly isFavorite = computed(() => {
    this.photo() 
    ? this.favoritesService.isFavorite(this.photo()!.id) 
    : false;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { return; }

    this.photoService.getPhotoById(id).subscribe({
      next: (photo: Photo | null) => {
        this.photo.set(photo);
        this.loading.set(false);
      },
      error: () => console.log('Error loading photo:' + id),
      complete: () => this.loading.set(false)
    });
  }

}
