import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoGalleryPage } from './photo-gallery-page';
import { PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

const mockPhotos = [
  { id: '1', author: 'A', download_url: 'https://picsum.photos/id/1/500/333', src: 'https://picsum.photos/id/1/500/333' },
  { id: '2', author: 'B', download_url: 'https://picsum.photos/id/2/500/333', src: 'https://picsum.photos/id/2/500/333' },
];

const mockPhotoService = {
  getPhotos: jest.fn(() => of(mockPhotos)),
  appendPhotos: jest.fn(),
};

const mockFavoritesService = {
  isFavorite: jest.fn((id) => id === '1'),
  toggle: jest.fn(),
};
describe('PhotoGalleryPage', () => {
  let component: PhotoGalleryPage;
  let fixture: ComponentFixture<PhotoGalleryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGalleryPage],
      providers: [
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: FavoritesService, useValue: mockFavoritesService },
        provideRouter([]),
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
    expect(component.items().length).toBeGreaterThan(0);
    expect(component.loading()).toBe(false);
  });

  it('should load photos on init and update items', () => {
    mockPhotoService.getPhotos.mockReturnValue(of(mockPhotos));

    component.ngOnInit();

    expect(mockPhotoService.getPhotos).toHaveBeenCalledWith(1);
    expect(component.items().length).toBeGreaterThan(0);
    expect(mockPhotoService.appendPhotos).toHaveBeenCalledWith(mockPhotos);
    expect(component.loading()).toBe(false);
  });

  it('should handle error when loading photos fails', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    mockPhotoService.getPhotos.mockReturnValue(throwError(() => new Error('fail')));

    component.loadMore();

    expect(logSpy).toHaveBeenCalledWith('Error loading photos', expect.any(Error));
    expect(component.loading()).toBe(false);
  });

  it('should not call loadMore again when already loading', () => {
    component.loading.set(true);
    mockPhotoService.getPhotos.mockClear();
    component.loadMore();
    expect(mockPhotoService.getPhotos).not.toHaveBeenCalled();
  });

  it('should call FavoritesService.toggle when toggleFavorite() is triggered', () => {
    const photo = mockPhotos[0];
    component.toggleFavorite(photo);
    expect(mockFavoritesService.toggle).toHaveBeenCalledWith(photo);
  });

  it('should return true when photo is favorite', () => {
    const result = component.isFavorite('1');
    expect(result).toBe(true);
  });

  it('should return false when photo is not favorite', () => {
    const result = component.isFavorite('3');
    expect(result).toBe(false);
  });
});
