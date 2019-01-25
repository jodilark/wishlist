import { Injectable } from '@angular/core';
import { Item } from '../item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemCrudService {
  url = 'http://localhost:8010/api/';

  constructor(private http: HttpClient) { }
  
  getItems(){
    return this.http.get(this.url + 'items').toPromise()
  }

  createItems(item){
    //auto-generate here
    return this.http.post(this.url + 'createItem', item).toPromise();
  }
}
