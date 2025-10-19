import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInfoDialog } from './photo-info-dialog';

describe('PhotoInfoDialog', () => {
  let component: PhotoInfoDialog;
  let fixture: ComponentFixture<PhotoInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoInfoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
