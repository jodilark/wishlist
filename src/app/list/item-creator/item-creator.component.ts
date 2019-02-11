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
  dateOrAmount:string;
  durations:string[] = ['Daily', 'Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
  additionalDetails:boolean = false;
  nextPayDate:Date;
  deposit:number;
  frequency:string;

  constructor() { }

  ngOnInit() {
    this.dateOrAmount = 'Date';
  }

  createAndGenerate(){
    if(!this.name || !this.cost) return;
    const item = new Item();
    item.name = this.name;
    item.dueDate = this.dueDate;
    item.cost = this.cost;
    this.newItem.emit(item);
  }
  addDetails(){
    this.additionalDetails = true;
  }
  clearDetails(){
    this.additionalDetails = false;
    setTimeout(()=>{
      this.ngOnInit();
    })
  }
  create(){
    const item = new Item();
    item.additionalDetails = this.additionalDetails;
    item.name = this.name;
    item.dueDate = this.dueDate;
    item.cost = this.cost;
    item.nextPayDate = this.nextPayDate;
    item.deposit = this.deposit;
    item.frequency = this.frequency;
    this.newItem.emit(item);
  }

}
