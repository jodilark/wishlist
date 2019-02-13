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
      this.currentX = this.elementX;
      this.selectedElement = event.target;
      event.preventDefault(); 
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event) {
    var maxWidth = 300;
    this.movedX = event.touches[0].clientX - this.selectedElement.clientWidth;
    this.moveAmount = this.movedX - this.currentX;
    this.moveAmount += this.elementX;
    if(maxWidth > this.moveAmount && this.moveAmount > 0){
      console.log(maxWidth)
      event.target.style.left = this.moveAmount + 'px';
      this.percentage = this.moveAmount/maxWidth;
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event) {
    this.movedX = null;
    this.elementX = this.selectedElement.offsetLeft;
    this.current.emit(this.percentage);
  }

  constructor(el: ElementRef) { 
    console.log(el)
    el.nativeElement.setAttribute('draggable', true);
  }

}
