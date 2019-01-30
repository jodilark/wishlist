export class Item {
    id:number;
    name:string;
    cost:number;
    dueDate:Date;
    ready?:boolean;
    nextPayDate:Date;
    deposit:number;
    frequency:string;
    additionalDetails?:boolean;
}