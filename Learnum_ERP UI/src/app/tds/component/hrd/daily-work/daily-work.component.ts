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

 worksheetList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100
    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100

    },
    {
      field: 'Date',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    // {
    //   field: 'Role',
    //   headerName: 'Role',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 100

    // },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }, 
    
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
  selectwork($event: any) {
    throw new Error('Method not implemented.');
    }
  


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'WorkId': data.row.WorkId
    }
    this.router.navigate(['tds/hrd/daily-work/add-worksheet'], { queryParams: data1 });
  }



   declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewContentWriter',
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
      this.worksheetList = result.Value;
      let worksheetList = result.Value;
    })
  }

  editWorksheet(WorkSheetData: any) {
    const WorkId = WorkSheetData.WorkId;
    const index = this.worksheetList.findIndex(Worksheet => Worksheet.WorkId === WorkId);

    if (index !== -1) {
      this.openEditForm(WorkSheetData).then((editedWorkSheetData: any) => {
        this.worksheetList[index] = editedWorkSheetData;
        console.log('Edited WorkSeet:', editedWorkSheetData);
      });
    }
  }

  openEditForm(WorkSheetData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedWorkSheetData = { ...WorkSheetData };
        editedWorkSheetData.Status = 'Edited';
        resolve(editedWorkSheetData);
      }, 1000);
    });
  }
}
