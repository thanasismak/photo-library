import { Directive, EventEmitter, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScroll {
  threshold = input<number>(300); // px from bottom
  disabled = input<boolean>(false);

  scrolled = new EventEmitter<void>();
  @HostListener('window:scroll', [])
  
  onWindowScroll() {
    if (this.disabled()) return;
    const pos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;
    if (max - pos <= this.threshold()) {
      this.scrolled.emit();
    }
  }
}
