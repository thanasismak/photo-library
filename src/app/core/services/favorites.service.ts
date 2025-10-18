import { effect, Injectable, signal } from '@angular/core';
import { Photo } from './photo.service';

const FAVORITES_KEY = 'favorites';
@Injectable({
  providedIn: 'root'
})

export class FavoritesService {
  favorites = signal<Photo[]>(this.restore());

  constructor() {
    // Automatically persist favorites to localStorage whenever they change
    effect(() => {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(this.favorites()));
    });
  }

  // --- Public API ---
  add(photo: Photo) {
    if (!this.isFavorite(photo.id)) {
      this.favorites.update(favs => [...favs, photo]);
    }
  }

  remove(id: string) {
    this.favorites.update(favs => favs.filter(fav => fav.id !== id));
  }

  isFavorite(id: string): boolean {
    return this.favorites().some(fav => fav.id === id);
  }

  toggle(photo: Photo) {
    this.isFavorite(photo.id) ? this.remove(photo.id) : this.add(photo);
  }

  clearAll() {
    this.favorites.set([]);
  }
  // Helpers
  private restore(): Photo[] {
    const stored = localStorage.getItem(FAVORITES_KEY || []);
    return stored ? JSON.parse(stored) : [];
  }
}
