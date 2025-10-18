import { Photo } from "./photo.service";

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
