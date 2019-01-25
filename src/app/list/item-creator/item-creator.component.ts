import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'app-item-creator',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.scss']
})
export class ItemCreatorComponent implements OnInit {

  @Output() newItem = new EventEmitter<Item>();

  name:string;
  cost:number;
  dueDate:Date;

  constructor() { }

  ngOnInit() {
  }

  createAndGenerate(){
    const item = new Item();
    item.name = this.name;
    item.dueDate = this.dueDate;
    item.cost = this.cost;
    this.newItem.emit(item);
  }

}
