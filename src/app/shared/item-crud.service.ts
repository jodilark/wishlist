import { Injectable } from '@angular/core';
import { Item } from '../item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const durations:string[] = ['Daily', 'Weekly', 'Every Other Week', 'Bi-Monthly', 'Monthly', 'Quarterly', 'Bi-annually', 'Yearly'];
const daysOfWeek:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const milInDays:number = (1000*60*60*24);
const local:any = new Date();
const frequencyMilsKey:any = {
        Daily:1,
        Weekly:7,
        EveryOtherWeek:14,
        BiMonthly:15.208333333333333,
        Monthly:30.416666666666667,
        Quarterly:91.25,
        BiAnnually:182.5,
        Yearly:365
      };

@Injectable({
  providedIn: 'root'
})
export class ItemCrudService {
  url = 'http://localhost:8010/api/';

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get(this.url + 'items').toPromise()
  }

  generateSchedule(item){
    //auto-generate here

    let want:any = new Date(item.dueDate + 'T08:00:00Z'),
      localInMil = Date.parse(local),
      wantInMil = Date.parse(want),
      days = Math.ceil((wantInMil - localInMil) / milInDays),
      autoStartDateInMil,
      autoStartDate, dayOfWeek = local.getDay();
    function nextPayDayFinder(payDay){
      autoStartDateInMil = localInMil + (milInDays * (daysOfWeek.indexOf(payDay) - dayOfWeek));
      return new Date(autoStartDateInMil).toString();
    }
    autoStartDate = nextPayDayFinder('Thursday');
    // check what you need to divide by.
    switch(true){
      case(days < 7): //less than a week
      console.log('less than a week');
      // amount per day
      item.deposit = (item.cost / days);
      item.frequency = durations[0];
      break;
      case(14 > days && days >= 7): //more than a week, but not two weeks
      console.log('less than two weeks, but greater than a week');
      // amount per 7 days
      item.deposit = item.cost > (item.cost / 7) ? item.cost : (item.cost / 7);
      item.frequency = durations[1];
      break;
      case(days >= 14): // more than two weeks
      console.log('greater than two weeks');
      // amount per 14 days
      let dayCalc = Math.floor((days / 14));
      item.deposit = item.cost / dayCalc;
      item.frequency = durations[2];
      break;
      default:
      break;
    }
  }
  createSchedule(item){
    let costPerDepositAmount, 
      daysTilReady, 
      startDateInMil,
      local:any = new Date(),
      localInMil = Date.parse(local);
      
    //get new due date
    // cost 10; deposit 2; costPerDepositAmount 5
    // costPerDepositAmount * frequency
    if(item.deposit){
      var simplify = item.frequency.split(' '), simplifyString = simplify.join('');
      costPerDepositAmount = item.cost / item.deposit;
      daysTilReady = costPerDepositAmount * frequencyMilsKey[simplifyString];
      startDateInMil = localInMil + (milInDays * daysTilReady);
      item.dueDate = new Date(startDateInMil).toString();
    } else {
      this.generateSchedule(item);
    }
  }

  createItems(item){
    item.additionalDetails ? this.createSchedule(item) : this.generateSchedule(item);
    return this.http.post(this.url + 'createItem', item).toPromise();
  }

  deleteItems(items){
    let body:any = JSON.stringify(items);
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    let options = {
          headers: headers,
          body: body
        };
    return this.http.delete(this.url + 'deleteItems', options).toPromise();
  }
}
