import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddWorksheetservices } from './add-worksheet/add-worksheetservices.service';

@Component({
  selector: 'app-daily-work',
  templateUrl: './daily-work.component.html',
  styleUrls: ['./daily-work.component.scss']
})
export class DailyWorkComponent implements OnInit {
onRowAction($event: any) {
throw new Error('Method not implemented.');
}

  tdsReturnList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100
    },
    {
      field: 'Email',
      headerName: 'email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100

    },
    {
      field: 'Date',
      headerName: 'date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'Role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100

    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'modifiedBy',
      headerName: 'Modified By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'modifiedTime',
      headerName: 'Modified Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];
  getEmployeeList: any;



  ngOnInit(): void {
    this.getWorksheetDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addWorksheetservices: AddWorksheetservices,

    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
    }
  }
  selectBranch(branch: any) {

  }
  


  // onRowAction(data: any) {
  //   let data1 = {
  //     'source': 'edit',
  //     'branchID': data.row.branchID
  //   }
  //   this.router.navigate(['/tds/hrd/add-trainer'], { queryParams: data1 });
  // }



   declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddDailywork() {

    // let navigationExtras: NavigationExtras = {};
    // if (employee) {
    //   navigationExtras = {
    //     state: {
    //       employeeData: employee
    //     }
    //   };
    // }
    this.router.navigateByUrl('tds/hrd/daily-work/add-worksheet')
  }


  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  
  getWorksheetDetails() {
    this.addWorksheetservices.getworksheetList().subscribe((result: any) => {
      this.tdsReturnList = result.Value;
      let tdsReturnList = result.Value;
    })
  }
}
