import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({providedIn: "root"})

export class SubjectService {
  
  public changeearnings : BehaviorSubject<any> = new BehaviorSubject<any>([]); // Provide an initial value
  constructor(){
    
  }
  setChangeearnings(data: any) {
    this.changeearnings.next(data);
  }
}