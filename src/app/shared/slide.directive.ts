import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appSlide]'
})
export class SlideDirective {

  currentX:number;
  movedX:number;
  selectedElement:any;
  elementX:number = 0;
  moveAmount:number;
  percentage:number;
  maxWidth:number = 300;
  over:boolean = true;

  @Output() current = new EventEmitter<any>();

  private start(event){
    if (event.target.getAttribute('draggable')) {
      this.currentX = this.elementX;
      this.selectedElement = event.target;
      event.preventDefault(); 
    }
  }
  private move(event){
    let moveDif:number;
    this.movedX = event.touches[0].clientX - this.selectedElement.clientWidth;
    moveDif = this.movedX - this.currentX;
    this.moveAmount = Math.round(moveDif += this.elementX);
    if(this.maxWidth >= this.moveAmount && this.moveAmount > 0){
      event.target.style.left = this.moveAmount + 'px';
      this.percentage = this.moveAmount/this.maxWidth;
      this.current.emit(this.percentage);
    }
  }
  private moveMouse(event){
    let moveDif:number;
    this.movedX = event.clientX - this.selectedElement.clientWidth;
    moveDif = this.movedX - this.currentX;
    this.moveAmount = Math.round(moveDif += this.elementX);
    if(this.maxWidth >= this.moveAmount && this.moveAmount > 0){
      event.target.style.left = this.moveAmount + 'px';
      this.percentage = this.moveAmount/this.maxWidth;
      this.current.emit(this.percentage);
    }
  }
  private end(event){
    this.movedX = null;
    this.elementX = this.selectedElement.offsetLeft;
    this.selectedElement = null;
  }

  @HostListener('touchstart', ['$event'])
  private onTouchStart(event) {
    this.start(event);
  }

  @HostListener('touchmove', ['$event'])
  private onTouchMove(event) {
    this.move(event);
  }

  @HostListener('touchend', ['$event'])
  private onTouchEnd(event) {
    this.end(event);
  }

  //for desktop (non-touch)
  @HostListener('mousedown', ['$event'])
  private onMouseDown(event) { this.start(event) }
  @HostListener('mousemove', ['$event'])
  private onMouseMove(event) {
    if(this.selectedElement && this.over){ this.moveMouse(event) };
  }
  @HostListener('mouseover', ['$event'])
  private onMouseOver(event) { this.over = true }
  @HostListener('mouseup', ['$event'])
  private onMouseUp(event) {
    if(this.selectedElement){ this.end(event) };
  }
  @HostListener('mouseout', ['$event'])
  private onMouseOut(event) {
    if(this.selectedElement){ this.end(event) };
  }

  constructor(el: ElementRef) { 
    console.log(el)
    el.nativeElement.setAttribute('draggable', true);
  }

}
