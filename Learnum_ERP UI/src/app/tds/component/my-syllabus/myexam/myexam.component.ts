import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myexam',
  templateUrl: './myexam.component.html',
  styleUrls: ['./myexam.component.scss']
})
export class MyexamComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  NewEmployeethisMonth:number = 368;
  norecord: string | null = null;
}
