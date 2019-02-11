import { Component, OnInit } from '@angular/core';
import { Item } from '../item.model';
import { ItemCrudService } from '../shared/item-crud.service';

const local:any = new Date();

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  title = 'wishlist';
  durations:any = ['Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
  item: Item;
  itemList: any;
  selected:any = [];

  constructor(private itemService:ItemCrudService) { }

  // async ngOnInit() {
  //   const res = await this.itemService.getItems();
  //   console.log(res);
  // }

  ngOnInit(){
    this.itemService.getItems().then(res => {
      this.setRdyStatus(res);
    });
  }

  setRdyStatus(res:any){
    res.map((e,i) => {
      if(Date.parse(local) >= Date.parse(e.dueDate)){
        e.ready = true;
      } else {
        e.ready = false;
      }
    });
    this.itemList = res;
  }

  
  onNewItem(event: Item){
    this.itemService.createItems(event).then(res => {
      this.itemList = res;
    });
  }

  onSelectedItem(event: Item){
    if(event.selected){
      this.selected.push(event);
    } else {
      this.selected.splice(this.selected.indexOf(event), 1);
    }
    setTimeout(()=>{
      console.log(this.selected);
    },0);
  }

  deleteSelected(){
    if(this.selected.length > 0){
      this.itemService.deleteItems(this.selected)
      .then(res => {
        this.ngOnInit();
      });
    }
  }

}
