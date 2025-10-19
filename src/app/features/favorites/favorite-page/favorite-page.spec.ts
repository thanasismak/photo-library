import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePage } from './favorite-page';
import { signal } from '@angular/core';
import { FavoritesService } from '../../../core/services/favorites.service';
import { PhotoCard } from '../../../shared/components/photo-card/photo-card';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

const mockFavorites = signal([
  { id: '1', author: 'Author 1', download_url: 'https://picsum.photos/id/1/500/333' },
  { id: '2', author: 'Author 2', download_url: 'https://picsum.photos/id/2/500/333' },
]);

const mockService = {
  favorites: mockFavorites,
  toggle: jest.fn(),
  clearAll: jest.fn(),
  isFavorite: jest.fn(),
} as unknown as jest.Mocked<FavoritesService>;

describe('FavoritePage', () => {
  let fixture: ComponentFixture<FavoritePage>;
  let component: FavoritePage;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePage, PhotoCard],
      providers: [{ provide: FavoritesService, useValue: mockService },
        provideRouter([])
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FavoritePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute favorites from FavoritesService', () => {
    expect(component.favorites().length).toBe(2);
    expect(component.favorites()[0].id).toBe('1');
  });

  it('should call FavoritesService.toggle when toggle() is triggered', () => {
    const photo = {
      id: '99',
      author: 'Test',
      download_url: 'https://picsum.photos/id/99/500/333',
      src: 'https://picsum.photos/id/99/500/333' // Added src property
    };
    component.toggle(photo);
    expect(mockService.toggle).toHaveBeenCalledWith(photo);
  });

  it('should call FavoritesService.clearAll when clearAll() is triggered', () => {
    component.clearAll();
    expect(mockService.clearAll).toHaveBeenCalled();
  });

  it('should render "Your Favorites" section when favorites exist', () => {
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(heading.textContent).toContain('Your Favorites');
  });

  it('should show "No favorites" message when list is empty', () => {
    mockService.favorites.set([]); // Clear all favorites
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.empty p')).nativeElement;
    expect(message.textContent).toContain('No favorites yet.');
  });
});
