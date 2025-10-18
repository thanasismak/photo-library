import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_BASE } from '../constants/api.constant';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected http = inject(HttpClient);

  get<T>(url: string): Observable<T> {
    return this.http
      .get<T>(url)
      .pipe(catchError((error) => {
        console.error('GET request error:', error);
        throw error;
      }));
  }

  // post<T>(url: string) {}

  // put<T>(url: string) {}

  // delete<T>(url: string) {}
}
