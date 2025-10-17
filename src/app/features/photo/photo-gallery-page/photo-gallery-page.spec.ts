import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryPage } from './photo-gallery-page';

describe('PhotoGalleryPage', () => {
  let component: PhotoGalleryPage;
  let fixture: ComponentFixture<PhotoGalleryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGalleryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
