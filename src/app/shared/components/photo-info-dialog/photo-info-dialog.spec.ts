import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoInfoDialog } from './photo-info-dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

const mockPhoto = {
  id: '1',
  author: 'John Doe',
  download_url: 'https://picsum.photos/id/1/500/333',
  width: 500,
  height: 333
};

describe('PhotoInfoDialog', () => {
  let component: PhotoInfoDialog;
  let fixture: ComponentFixture<PhotoInfoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoInfoDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockPhoto },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PhotoInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and render data correctly', () => {
    expect(component.dialogData).toEqual(mockPhoto);
  });

  it('should display author name in heading', () => {
    const heading = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(heading.textContent).toContain(mockPhoto.author);
  });

});
