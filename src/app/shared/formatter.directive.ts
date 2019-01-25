import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFormatter]'
})
export class FormatterDirective {
  elem:any;

  constructor(el: ElementRef) { 
    this.elem = el.nativeElement;
  }
}
