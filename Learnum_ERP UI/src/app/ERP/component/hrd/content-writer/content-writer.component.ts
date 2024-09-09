import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddcontentWriterService } from './add-contentwriter/addcontent-writer.service';

@Component({
  selector: 'app-content-writer',
  templateUrl: './content-writer.component.html',
  styleUrls: ['./content-writer.component.scss']
})
export class ContentWriterComponent implements OnInit {


  ContentWriterList: any[] = [];
  form: FormGroup;

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewContentWriter',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Content Writer'
    },
  ];

  declaredTableColumns: TableColumn[] = [

    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Course Name',

    },
    {
      field: 'SubjectName',
      headerName: 'Subject Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Subject Name',

    },
    {
      field: 'ContentWriterName',
      headerName: 'ContentWriter Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'ContentWriter Name',

    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Status',
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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
    this.getContentWriterDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addcontentWriterService: AddcontentWriterService,

    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({});
    }
  }
  selectContentWriter($event: any) {
    throw new Error('Method not implemented.');
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'ContentWriterId': data.row.ContentWriterId
    }
    this.router.navigate(['erp/hrd/content-writer/add-contentwriter'], { queryParams: data1 });
  }




  onAddContentWriter() {
    this.router.navigateByUrl('erp/hrd/content-writer/add-contentwriter')
  }


  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getContentWriterDetails() {
    this.addcontentWriterService.getContentWriterList().subscribe((result: any) => {
      this.ContentWriterList = result.Value;

    })
  }


}
