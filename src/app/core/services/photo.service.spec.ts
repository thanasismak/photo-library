import { TestBed } from '@angular/core/testing';
import { PHOTO_KEY, PhotoService } from './photo.service';
import { BaseService } from './base.service';
import { of } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constant';

const mockPhotos = [
  { id: '1', author: 'John', src: 'src1', width: 500, height: 333 },
  { id: '2', author: 'Jane', src: 'src2', width: 500, height: 333 },
];

const mockBaseService = {
  get: jest.fn(),
};

describe('PhotoService', () => {
  let service: PhotoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: BaseService, useValue: mockBaseService }],
    });
    service = TestBed.inject(PhotoService);
  });

  afterEach(() => { jest.restoreAllMocks(); });

  it('should be created', () => {
    expect(service.photos().length).toBe(0);
  });

  it('should call BaseService.get with correct endpoint and map response', (done) => {
    mockBaseService.get.mockReturnValue(of(mockPhotos));

    service.getPhotos(1).subscribe((res) => {
      expect(mockBaseService.get).toHaveBeenCalledWith(API_ENDPOINTS.PHOTO_LIST(1, 20));
      expect(res).toEqual(expect.arrayContaining(mockPhotos));
    });
    done();
  });

  it('should call BaseService.get with PHOTO_BY_ID endpoint', (done) => {
    const mockPhoto = mockPhotos[0];
    mockBaseService.get.mockReturnValue(of(mockPhoto));

    service.getPhotoById('1').subscribe((res) => {
      expect(mockBaseService.get).toHaveBeenCalledWith(API_ENDPOINTS.PHOTO_BY_ID('1'));
      expect(res).toEqual(mockPhoto);
    });
    done();
  });

  it('should append photos to signal', () => {
    const batch = [mockPhotos[0]];
    service.appendPhotos(batch);
    expect(service.photos()).toContainEqual(mockPhotos[0]);
  });

  it('should return photo from store if available', () => {
    const photo = mockPhotos[0];
    service.photos.set([photo]);
    const result = service.getPhotoFromStore('1');
    expect(result).toEqual(photo);
  });

  it('should return undefined if photo is not found in store', () => {
    service.photos.set([]);
    const result = service.getPhotoFromStore('3');
    expect(result).toBeUndefined();
  });

  it('should build correct image URL', () => {
    const url = service.getImageUrlById('10', { w: 500, h: 300 });
    expect(url).toContain('10');
    expect(url).toContain('500');
    expect(url).toContain('300');
  });
});
