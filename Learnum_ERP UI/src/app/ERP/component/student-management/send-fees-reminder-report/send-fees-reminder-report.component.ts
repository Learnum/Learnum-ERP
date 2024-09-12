import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { SendfeesreminderService } from './fees-reminder/sendfeesreminder.service';

@Component({
  selector: 'app-send-fees-reminder-report',
  templateUrl: './send-fees-reminder-report.component.html',
  styleUrls: ['./send-fees-reminder-report.component.scss']
})
export class SendFeesReminderReportComponent implements OnInit {

  SendFeesReminderList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Branch Name'
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Branch Name'
    },
    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Course Name'

    },
    {
      field: 'DueDate',
      headerName: 'Due Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Due Date'

    },
    {
      field: 'InstallmentAmount',
      headerName: 'Installment Amount',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Installment Amount'

    },
    {
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By',
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
    }, 
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit'
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private sendfeesreminderService : SendfeesreminderService
  ) { }

  ngOnInit(): void {
  this.getSendFeesReminderList();
  }

  // AddRecord() {
  //   this.router.navigate(['erp/student-management/fees-reminder']);
  // }

  // onRowAction(data: any) {
  //   let data1 = {
  //     'source': data.action,
  //     'ReminderId': data.row.ReminderId
  //   };
  //   this.router.navigate(['/erp/student-management/fees-reminder'], { queryParams: data1 });
  // }

  // onActionButton(action: string) {
  //   alert(action + ' action button clicked.');
  // }

  // selectRecord(records: any) {
  //   // Handle row selection logic
  // }
  onSendFeesReminder(sendfeesreminder?: any) {

    let navigationExtras: NavigationExtras = {};
    if (sendfeesreminder) {
      navigationExtras = {
        state: {
          sendfeesreminderData: sendfeesreminder
        }
      };
    }
    this.router.navigateByUrl('erp/student-management/fees-reminder')
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'SendFeesId': data.row.SendFeesId
    }
    this.router.navigate(['/erp/student-management/fees-reminder'], { queryParams: data1 });
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  selectSendFeesReminder($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }

  getSendFeesReminderList() {
    this.sendfeesreminderService.getSendFeesReminderList().subscribe((result: any) => {
      this.SendFeesReminderList = result.Value;
      let offlineFeesList = result.Value;
    })
  }
}
