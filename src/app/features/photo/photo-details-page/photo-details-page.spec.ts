import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoDetailsPage } from './photo-details-page';

describe('PhotoDetailsPage', () => {
  let component: PhotoDetailsPage;
  let fixture: ComponentFixture<PhotoDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
