import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'photos', loadComponent: () => import('./features/photo/photo-gallery-page/photo-gallery-page').then(m => m.PhotoGalleryPage) },
    { path: 'favorites', loadComponent: () => import('./features/favorites/favorite-page/favorite-page').then(m => m.FavoritePage) },
    { path: 'photos/:id', loadComponent: () => import('./features/photo/photo-details-page/photo-details-page').then(m => m.PhotoDetailsPage) },
    { path: '**', redirectTo: 'home' }
];
