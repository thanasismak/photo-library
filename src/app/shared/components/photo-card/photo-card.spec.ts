import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhotoCard } from './photo-card';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PhotoService } from '../../../core/services/photo.service';
import { FavoritesService } from '../../../core/services/favorites.service';

const mockPhoto = {
  id: '1',
  author: 'Test Author',
  src: 'https://picsum.photos/id/1/500/333',
  download_url: 'https://picsum.photos/id/1/500/333',
};

const mockFavoritesService: jest.Mocked<FavoritesService> = {
  ...jest.requireActual('../../../core/services/favorites.service'),
  isFavorite: jest.fn()
};

describe('PhotoCard', () => {
  let component: PhotoCard;
  let fixture: ComponentFixture<PhotoCard>;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService },
        provideRouter([]),
        provideHttpClientTesting()
      ],
      imports: [PhotoCard]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('photo', mockPhoto);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the image with correct src', () => {
    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(img?.src).toContain(mockPhoto.src);
  });

  it('should emit toggleFavorite output when called', () => {
    jest.spyOn(component.toggleFavorite, 'emit');
    component.toggleFavorite.emit(mockPhoto);
    expect(component.toggleFavorite.emit).toHaveBeenCalledWith(mockPhoto);
  });

  it('should identify gallery view correctly', () => {
    expect(component.isGalleryView()).toBe(false);
  });

  it('should check if photo is favorite using favoritesService', () => {
    mockFavoritesService.isFavorite.mockReturnValue(true);
    const result = mockFavoritesService.isFavorite(mockPhoto.id);
    expect(result).toBe(true);
    expect(mockFavoritesService.isFavorite).toHaveBeenCalledWith('1');
  });

  it('should react to changes in photo input', () => {
  const newPhoto = {
    id: '2',
    author: 'Another Author',
    src: 'https://picsum.photos/id/2/500/333',
    download_url: 'https://picsum.photos/id/2/500/333',
  };
  fixture.componentRef.setInput('photo', newPhoto);
  fixture.detectChanges();

  const img: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
  expect(img?.src).toContain(newPhoto.src);
});
});
