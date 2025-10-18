import { Photo } from "./photo.service";

export function mapApiResponseToPhotos(data: any[]): Photo[] {
  return data.map((item: any) => ({
    id: item.id,
    src: item.src,
    alt: item.alt,
    previewUrl: item.previewUrl
  }));
}
