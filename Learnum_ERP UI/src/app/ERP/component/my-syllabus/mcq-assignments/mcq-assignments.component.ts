import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { McqService } from './addmcq/mcq.service';

@Component({
  selector: 'app-mcq-assignments',
  templateUrl: './mcq-assignments.component.html',
  styleUrls: ['./mcq-assignments.component.scss']
})
export class McqAssignmentsComponent implements OnInit {


  McqList: any[] = [];


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
      field: 'TopicName',
      headerName: 'Topic Name',
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
      minWidth: 150,
       headerTooltip:'Added By'
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Added Time'
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Updated By'
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip:'Updated Time'
    }, 
    
  ];
  



  ngOnInit(): void {
   this.GetMcqList();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private mcqService: McqService,
    private formBuilder: FormBuilder) {
    {}}
  
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'McqId': data.row.McqId
    }
    this.router.navigate(['erp/my-syllabus/mcq-assignments/addmcq'], { queryParams: data1 });
  }


  selectMcq($event: any) {
    throw new Error('Method not implemented.');
  }

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View MCQ',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit MCQ'
    },
  ];
  
  onAddMcq()
  {
    this.router.navigate(['erp/my-syllabus/mcq-assignments/addmcq']);
  }
  
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }


  GetMcqList(){
    this.mcqService.getMcqDetails().subscribe(
      (result: any) => {
        this.McqList = result.Value;
        let McqList = result.Value;
      }
    );
  }
}




