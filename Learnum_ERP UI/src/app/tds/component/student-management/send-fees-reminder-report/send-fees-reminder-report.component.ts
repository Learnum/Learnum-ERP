import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';

@Component({
  selector: 'app-send-fees-reminder-report',
  templateUrl: './send-fees-reminder-report.component.html',
  styleUrls: ['./send-fees-reminder-report.component.scss']
})
export class SendFeesReminderReportComponent implements OnInit {

  feeReminderList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'branchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'courseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'batchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'installmentAmount',
      headerName: 'Installment Amount',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewReminder',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditReminder',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getFeeReminderList();
  }

  getFeeReminderList() {
    // Uncomment and implement this method to fetch fee reminders from your service
    // this.feeReminderService.getFeeReminderList().subscribe(
    //   (result: any) => {
    //     this.feeReminderList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching fee reminder list:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching fee reminder list. Please try again later.");
    //   }
    // );
  }

  AddRecord() {
    this.router.navigate(['tds/student-management/fees-reminder']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'ReminderId': data.row.ReminderId
    };
    this.router.navigate(['/tds/student-management/fees-reminder'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectRecord(records: any) {
    // Handle row selection logic
  }
}
