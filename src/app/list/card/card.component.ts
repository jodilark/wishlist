import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../item.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() passedItem = new Item;
  constructor() { }

  ngOnInit() {
  }

}
