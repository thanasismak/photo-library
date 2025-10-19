import { FAVORITES_KEY } from "./favorites.service";
import { Photo, PHOTO_KEY } from "./photo.service";

export function mapApiResponseToPhotos(data: any[]): Photo[] {
  return data.map((item: any) => ({
    id: item.id,
    src: item.download_url,
    alt: item.url,
    width: item.width,
    height: item.height,
    author: item.author
  }));
}

export function mapApiResponseToPhoto(data: any): Photo {
  return {
    id: data.id,
    src: data.download_url,
    alt: data.url,
    width: data.width,
    height: data.height,
    author: data.author
  };
}

export function restoreFavoritePhotos(): Photo[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function restoreDetailedPhoto(): Photo[] {
  const stored = localStorage.getItem(PHOTO_KEY);
  return stored ? JSON.parse(stored) : [];
}