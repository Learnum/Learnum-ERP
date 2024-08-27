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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Daily Worksheet',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Daily Worksheet'
    },
  ];
  declaredTableColumns: TableColumn[] = [
    {
      field: 'Name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      headerTooltip: 'Name',
    },
    {
      field: 'Email',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      headerTooltip: 'Email',

    },
    {
      field: 'Date',
      headerName: 'Date',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Date',

    },
    {
      field: 'Role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 100,
      headerTooltip: 'Role',
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By',
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
    }, 
    
  ];
    
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
      this.form = this.formBuilder.group({});
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



  
  onAddDailywork() {
    this.router.navigateByUrl('tds/hrd/daily-work/add-worksheet')
  }


  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  
  getWorksheetDetails() {
    this.addWorksheetservices.getworksheetList().subscribe((result: any) => {
      this.worksheetList = result.Value;
      
    })
  }
}
