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

  declaredTableColumns: TableColumn[] = [
  
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'SubjectName',
      headerName: 'Subject Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'contactwriterName',
      headerName: 'contactwriter Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
    },
    {
      field: 'addedBy',
      headerName: 'AddedBy',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'addedTime',
      headerName: 'AddedTime',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'updatedBy',
      headerName: 'UpdatedBy',
      filter: 'agDateColumnFilter',
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
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
        this.form = this.formBuilder.group({
          
          
        });
      }
  }
  selectBranch(branch: any) {

  }
 
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['/tds/masters/add-employee'], { queryParams: data1 });
  }



  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddContentWriter() {

 
    this.router.navigateByUrl('tds/hrd/content-writer/add-contentwriter')
  }
 

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }



  getContentWriterDetails() {
    this.addcontentWriterService.getContentWriterList().subscribe((result: any) => {
      this.ContentWriterList = result.Value;
      let ContentWriterList = result.Value;
    })
  } 
}
