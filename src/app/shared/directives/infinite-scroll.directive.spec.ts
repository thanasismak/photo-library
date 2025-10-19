import { Component } from '@angular/core';
import { InfiniteScrollDirective } from './infinite-scroll.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `<div appInfiniteScroll-directive (scrolled)="onScroll()"></div>`,
  standalone: true,
  imports: [InfiniteScrollDirective],
})

class TestHostComponent {
  onScroll = jest.fn();
}

describe('InfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create the host component and directive', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should emit scrolled event when near bottom', () => {
    Object.defineProperty(window, 'innerHeight', { value: 900 });
    Object.defineProperty(window, 'scrollY', { value: 2000, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2250 });

    window.dispatchEvent(new Event('scroll'));

    expect(host.onScroll).toHaveBeenCalled();
  });
});
