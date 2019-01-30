import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appInputFormatter]'
})
export class InputFormatterDirective {

  placeholder:string = '';
  color:string = 'transparent';

  @HostListener('focus', ['$event.target'])
  onFocus(btn) {
    btn.parentElement.className = 'input_group_focus';
    if(this.placeholder){
      btn.placeholder = this.placeholder;
    }
    if(btn.type === 'date'){
      this.color = 'inherit';
      btn.style = 'color:' + this.color + ';'
    }
  }

  @HostListener('blur', ['$event.target'])
  onBlur(btn) {
    let decimalIdx = btn.value.indexOf('.'),
      hasDecimal = decimalIdx > -1;
    if(!btn.value){
      btn.parentElement.className = 'input_group_default';
      btn.placeholder = '';
      if(btn.type === 'date'){
        this.color = 'transparent';
        btn.style = 'color:' + this.color + ';'
      }
    } else if(!hasDecimal && btn.type === 'number'){
      // console.log('does not have decimal')
      btn.value = btn.value + '.00'
    } else if(hasDecimal && btn.type === 'number'){
      // console.log('has decimal')
      btn.value = Number(btn.value).toFixed(2);
    }     
  }

  constructor(el: ElementRef) {
    if(el.nativeElement.placeholder){
      this.placeholder = el.nativeElement.placeholder;
      el.nativeElement.placeholder = '';
    }
    if(el.nativeElement.type === 'date'){
      el.nativeElement.style = 'color:' + this.color + ';'
    }
  }

}
