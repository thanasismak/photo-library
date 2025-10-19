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
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    //if the bottom of the page is within 300px of view, fire another data load.
    if (documentHeight - scrollPosition <= this.threshold()) { 
      this.scrolled.emit();
    }
  }
}
