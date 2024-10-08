import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddSubjectsService } from './add-subjects/add-subjects.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjectsList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewSubject',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Subject'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'SubjectId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'SR.NO',
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
      field: 'SubjectDescription',
      headerName: 'Subject Description',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
      headerTooltip: 'Subject Description',

    },
    {
      field: 'IsActive',
      headerName: 'Subject Status',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Subject Status',
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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
 
  ngOnInit(): void {
   this.getSubjectDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private addSubjectsService:AddSubjectsService,
    private messageService: MessageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) {
  }

   onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'SubjectId': data.row.SubjectId
    }
    this.router.navigate(['erp/masters/subjects/add-subjects'], { queryParams: data1 });
  }

  selectSubject($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }

  onAddSubject(subject?: any) {

    let navigationExtras: NavigationExtras = {};
    if (subject) {
      navigationExtras = {
        state: {
          subjectData: subject
        }
      };
    }
    this.router.navigateByUrl('erp/masters/subjects/add-subjects')
  }
  
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getSubjectDetails() {
    this.addSubjectsService.getSubjectList().subscribe((result: any) => {
      this.subjectsList = result.Value;
      let subjectsList = result.Value;
    })
  } 
 
}

  

