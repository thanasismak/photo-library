import { Directive, EventEmitter, HostListener, input, output, signal } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll-directive]',
  standalone: true
})
export class InfiniteScrollDirective {
  scrolled = output<void>();

  private readonly threshold = signal<number>(300); // px from bottom

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const ScrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    if (documentHeight - ScrollPosition <= this.threshold()) {
      this.scrolled.emit();
    }
  }
}
