import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() passedItem = new Item;
  @Output() selectedItem = new EventEmitter<Item>();
  selected:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleRowSelect(){
    this.selected = !this.selected;
    this.passedItem.selected = this.selected;
    this.selectedItem.emit(this.passedItem);
  }
}
