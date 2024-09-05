import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-dashboard-erp',
  templateUrl: './my-dashboard-erp.component.html',
  styleUrls: ['./my-dashboard-erp.component.scss']
})
export class MyDashboardERPComponent implements OnInit {

  presentDaysThisMonth: number = 0;
  presentDaysLastMonth: number = 0;
  todayBirthday: string | null = null;
  checkoutForm: FormGroup;

onCheckout() {
throw new Error('Method not implemented.');
}
selectView(arg0: string) {
throw new Error('Method not implemented.');
}
selectedView: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  
  checkIn() {
    // Add check-in logic here
    console.log('Checked In');
  }
  
  checkOut() {
    // Add check-out logic here
    console.log('Checked Out');
  }
 
}
