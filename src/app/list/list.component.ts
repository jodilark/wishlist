import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemCrudService } from '../shared/item-crud.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  durations:any = ['Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
  item: Item;

  itemList: Item[] = [
    {
      id:1,
      name:'motorcycle',
      cost:5000,
      dueDate: new Date('2019-07-01'),
      amount:50,
      duration:this.durations[1],
      ready:false
    },
    {
      id:2,
      name:'Hot Tub',
      cost:4000,
      dueDate: new Date('2019-10-01'),
      amount:100,
      duration:this.durations[2],
      ready:true
    }
  ];

  constructor(private itemService:ItemCrudService) { }

  // async ngOnInit() {
  //   const res = await this.itemService.getItems();
  //   console.log(res);
  // }

  ngOnInit(){
    this.itemService.getItems().then(res => console.log(res));
  }

}
