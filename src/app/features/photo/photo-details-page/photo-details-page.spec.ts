import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailsPage } from './photo-details-page';
import { Photo, PhotoService } from '../../../core/services/photo.service';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';

const mockPhoto = {
  id: '1',
  author: 'Author 1',
  download_url: 'https://picsum.photos/id/1/500/333',
  src: 'https://picsum.photos/id/1/500/333'
};

const mockDialogRef = {
  close: jest.fn(),
  open: jest.fn(),
} as unknown as jest.Mocked<any>;

const mockPhotoService = {
  getPhotoById: jest.fn(() => of(mockPhoto)),
  getPhotoFromStore: jest.fn(),
} as unknown as jest.Mocked<PhotoService>;

describe('PhotoDetailsPage', () => {
  let component: PhotoDetailsPage;
  let fixture: ComponentFixture<PhotoDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailsPage],
      providers: [
        provideRouter([]),
        { provide: PhotoService, useValue: mockPhotoService },
        { provide: 'MatDialog', useValue: mockDialogRef },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
          },
        }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => jest.clearAllMocks());

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load photo from store if available', () => {
    mockPhotoService.getPhotoFromStore.mockReturnValue(mockPhoto);

    component.ngOnInit();

    expect(mockPhotoService.getPhotoFromStore).toHaveBeenCalledWith('1');
    expect(component.photo()).toEqual(mockPhoto);
  });

  it('should fetch photo from API when not cached', () => {
    mockPhotoService.getPhotoFromStore.mockReturnValue(undefined);
    mockPhotoService.getPhotoById.mockReturnValue(of(mockPhoto));

    component.ngOnInit();

    expect(mockPhotoService.getPhotoById).toHaveBeenCalledWith('1');
    expect(component.photo()).toEqual(mockPhoto);
    expect(component.loading()).toBe(false);
  });

  it('should handle API error gracefully', () => {
    mockPhotoService.getPhotoFromStore.mockReturnValue(undefined);
    mockPhotoService.getPhotoById.mockReturnValue(
      throwError(() => new Error('fail'))
    );
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    component.ngOnInit();

    expect(mockPhotoService.getPhotoById).toHaveBeenCalledWith('1');
    expect(logSpy).toHaveBeenCalledWith(
      'Error loading photo details',
      expect.any(Error)
    );
    expect(component.loading()).toBe(false);
  });

  it('should not open dialog when photo is not available', () => {
    component.photo.set([] as unknown as Photo);
    component.openInfoDialog();
    expect(mockDialogRef.open).not.toHaveBeenCalled();
  });
});
