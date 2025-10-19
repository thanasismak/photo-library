import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, startWith } from 'rxjs';

export const DEFAULT_ROUTES = {
  PHOTOS: '/photos',
  FAVORITES: '/favorites'
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonToggleModule, RouterModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private router = inject(Router);
  private currentUrl = signal(this.router.url);

  activePath = computed(() => this.currentUrl().includes('favorites') ? 'favorites' : 'photos');
  defaultRoutes = [
    { label: 'Photos', path: DEFAULT_ROUTES.PHOTOS, key: 'photos' },
    { label: 'Favorites', path: DEFAULT_ROUTES.FAVORITES, key: 'favorites' }
  ];
  
  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith({ urlAfterRedirects: this.router.url }))
      .subscribe((event: any) => this.currentUrl.set(event.urlAfterRedirects));
  }
}
