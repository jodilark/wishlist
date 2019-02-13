import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  begin:number = 0;
  end:number = 50;
  currentValue:number = 0;

  constructor() { }

  ngOnInit() {
  }

  setCurrent(percentage){
    var newVal = percentage * (this.end);
    this.currentValue = Math.floor(newVal);
  }

}
