import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSlide]'
})
export class SlideDirective {

  // @HostListener('click', ['$event.target'])
  // onClick(btn){
  //   debugger
  // };

  currentX;
  movedX;
  selectedElement;
  elementX = 0;
  moveAmount;
  percentage;

  @Output() current = new EventEmitter<any>();
  // this.current.emit(this.passedItem);
  @HostListener('touchstart', ['$event'])
  onTouchStart(event) {
    if (event.target.getAttribute('draggable')) {
      this.currentX = event.touches[0].clientX;
      this.selectedElement = event.target;
      event.preventDefault(); 
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event) {
    var maxWidth = this.selectedElement.parentElement.scrollWidth - this.selectedElement.scrollWidth;
    this.movedX = event.touches[0].clientX;
    this.moveAmount = this.movedX - this.currentX;
    this.moveAmount += this.elementX;
    if(maxWidth > this.moveAmount && this.moveAmount > 0){
      event.target.style.left = this.moveAmount + 'px';
      this.percentage = this.moveAmount/this.selectedElement.parentElement.scrollWidth;
      console.log(this.percentage)
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event) {
    this.currentX = event.changedTouches[0].clientX;
    this.movedX = null;
    this.elementX = this.moveAmount;
    this.current.emit(this.percentage);
  }

  constructor(el: ElementRef) { 
    console.log(el)
    el.nativeElement.setAttribute('draggable', true);
  }

}
