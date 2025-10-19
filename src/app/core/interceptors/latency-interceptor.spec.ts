import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';

@Component({
  template: `<div appInfiniteScroll-directive (scrolled)="onScroll()"></div>`
})
class TestHostComponent {
  scrolled = jest.fn();
}

const setScrollValues = (innerHeight: number, scrollY: number, scrollHeight: number) => {
  // Instead of defining properties permanently, we mock them per test.
  Object.defineProperty(window, 'innerHeight', { value: innerHeight, configurable: true });
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', { value: scrollHeight, configurable: true });
};

describe('latencyInterceptor', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent, InfiniteScrollDirective],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should NOT emit scrolled event when far from bottom', () => {
    setScrollValues(600, 100, 3000);

    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(fixture.componentInstance.scrolled).not.toHaveBeenCalled();
  });
});
