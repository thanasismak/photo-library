import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Photo } from './photo.service';

const mockPhoto: Photo = {
  id: '1',
  author: 'John',
  src: 'url1',
  width: 500,
  height: 333,
};

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });
  
  afterEach(() => {jest.restoreAllMocks();});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a photo if not already favorite', () => {
    service.add(mockPhoto);
    expect(service.favorites().length).toBe(1);
    expect(service.favorites()[0]).toEqual(mockPhoto);
  });

  it('should not add duplicate photo', () => {
    service.add(mockPhoto);
    service.add(mockPhoto);
    expect(service.favorites().length).toBe(1);
  });

  it('should remove a photo by id', () => {
    service.add(mockPhoto);
    service.remove('1');
    expect(service.favorites().length).toBe(0);
  });

  it('should check if photo is favorite', () => {
    service.add(mockPhoto);
    expect(service.isFavorite('1')).toBe(true);
    expect(service.isFavorite('2')).toBe(false);
  });

  it('should toggle photo favorite state', () => {
    service.toggle(mockPhoto); // add
    expect(service.favorites().length).toBe(1);
    service.toggle(mockPhoto); // remove
    expect(service.favorites().length).toBe(0);
  });

  it('should clear all favorites', () => {
    service.add(mockPhoto);
    service.clearAll();
    expect(service.favorites().length).toBe(0);
  });
});
