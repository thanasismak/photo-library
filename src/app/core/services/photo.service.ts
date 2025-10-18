import { inject, Injectable } from '@angular/core';
import { API_BASE, API_ENDPOINTS } from '../constants/api.constant';
import { mapApiResponseToPhotos } from './utils';
import { map, Observable } from 'rxjs';
import { BaseService } from './base.service';
export interface Photo {
  id: string;
  src: string;
  alt: string;
  previewUrl: string;
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
}
