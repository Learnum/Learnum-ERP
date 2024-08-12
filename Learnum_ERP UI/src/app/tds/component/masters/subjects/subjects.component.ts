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
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Trainer'
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
      field: 'SubjectDescription',
      headerName: 'Subject Description',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200

    },
    {
      field: 'IsActive',
      headerName: 'Subject Status',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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
    this.router.navigate(['tds/masters/subjects/add-subjects'], { queryParams: data1 });
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
    this.router.navigateByUrl('tds/masters/subjects/add-subjects')
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
  editBranch(SubjectData: any) {
    const subjectId = SubjectData.subjectId;
    const index = this.subjectsList.findIndex(subject => subject.subjectId === subjectId);

    if (index !== -1) {


      this.openEditForm(SubjectData).then((editedSubjectData: any) => {

        this.subjectsList[index] = editedSubjectData;
        console.log('Edited Subject:', editedSubjectData);

      });
    }
  }
  openEditForm(subjectData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedSubjectData = { ...subjectData };

        editedSubjectData.Status = 'Edited';
        resolve(editedSubjectData);
      }, 1000);
    });
  }

}

  

