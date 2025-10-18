import { inject, Injectable } from '@angular/core';
import { API_BASE, API_ENDPOINTS } from '../constants/api.constant';
import { mapApiResponseToPhotos } from './utils';
import { delay, map, Observable, of } from 'rxjs';
import { BaseService } from './base.service';
export interface Photo {
  id: string;
  width?: number;
  height?: number;
  author?: string;
  src: string;
  alt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseService = inject(BaseService);

  public getPhotos(page?: number, limit?: number): Observable<Photo[]> {
    return this.baseService.get<Photo[]>(API_ENDPOINTS.PHOTO_LIST(page, limit)).pipe(
      map(data => mapApiResponseToPhotos(data))
    );
  }

  public getImageUrlById(id: string, size: { w: number, h: number } = { w: 1200, h: 800 }) {
    return API_ENDPOINTS.PHOTO_BY_ID(id, size.w, size.h);
  }

  /**
   * This Piscum API  endpoint for a single photo (e.g., /id/{id}/{width}/{height})
   * returns a raw image (binary JPEG) rather than JSON data.
   * Using HttpClient to fetch binary data would cause a JSON parse error. Instead, we simply
   * construct the image URL directly. letting the browser handle the image loading. via <img> tag.
   * This approach avoids unnecessary network processing and matches how static image endoints are handled.
   */
  public getPhotoById(id: string): Observable<Photo> {
    const photo: Photo = {
      id,
      src: API_ENDPOINTS.PHOTO_BY_ID(id, 1200, 800),
      alt: 'Photo ' + id
    };
    return of(photo).pipe(
      delay(200) // Simulate network delay
    );
  }
}
