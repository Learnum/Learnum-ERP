import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddsyllabusService } from './addsyllabus/addsyllabus.service';

@Component({
  selector: 'app-my-syllabus-erp',
  templateUrl: './my-syllabus-erp.component.html',
  styleUrls: ['./my-syllabus-erp.component.scss']
})
export class MySyllabusErpComponent implements OnInit {

  SyllabusDetailList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
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
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'TopicName',
      headerName: 'Topic Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
    {
      field: 'IsActive',
      headerName: 'Topic Status',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

    },
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

   declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View Syllabus',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Syllabus'
    },
  ];
  



  ngOnInit(): void {
    this.GetSyllabusList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addsyllabusService: AddsyllabusService,
    private formBuilder: FormBuilder) {} 

  selectBranch(branch: any) {

  }
 

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'branchID': data.row.branchID
    }
    this.router.navigate(['erp/my-syllabus/my-syllabus-erp/addsyllabus'], { queryParams: data1 });
  }

  GetSyllabusList(){
    this.addsyllabusService.getSyllabusDetails().subscribe(
      (result: any) => {
        this.SyllabusDetailList = result.Value;
        //let McqList = result.Value;
      }
    );
  }

 
  
 
 
 
  onAddSyllabus()
  {
    this.router.navigate(['erp/my-syllabus/my-syllabus-erp/addsyllabus']);
  }
  
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }



}

  



