import { effect, inject, Injectable, signal } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api.constant';
import { mapApiResponseToPhotos, restoreDetailedPhoto, mapApiResponseToPhoto } from './utils';
import { map, Observable } from 'rxjs';
import { BaseService } from './base.service';
export interface Photo {
  id: string;
  width?: number;
  height?: number;
  author?: string;
  src: string;
  alt?: string;
}

export const PHOTO_KEY = 'photos';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseService = inject(BaseService);
  private readonly PAGE_SIZE = 20;

  private readonly photos = signal<Photo[]>(restoreDetailedPhoto());

  public getPhotos(page: number): Observable<Photo[]> {
    return this.baseService.get<Photo[]>(API_ENDPOINTS.PHOTO_LIST(page, this.PAGE_SIZE)).pipe(
      map(data => mapApiResponseToPhotos(data))
    );
  }
  
  public getPhotoById(id: string): Observable<Photo> {
    return this.baseService.get<Photo[]>(API_ENDPOINTS.PHOTO_BY_ID(id)).pipe(
      map(data => mapApiResponseToPhoto(data))
    );
  
  }
  
  public getImageUrlById(id: string, size: { w: number, h: number } = { w: 1200, h: 800 }) {
    return API_ENDPOINTS.PHOTO_BY_ID(id, size.w, size.h);
  }

  constructor() {
    effect(() => {
      localStorage.setItem(PHOTO_KEY, JSON.stringify(this.photos()));
    });
  }

  appendPhotos(batch: Photo[]) {
    this.photos.update(prev => [...prev, ...batch]);
  }

  getPhotoFromStore(id: string): Photo | undefined {
    return this.photos().find(p => p.id === id);
  }

  clearPhotos() {
    this.photos.set([]);
  }
}
