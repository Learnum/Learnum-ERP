import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddClassroomsService } from './add-classrooms/add-classrooms.service';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  classroomDetailsList: any[] = [];
 
  declaredTableColumns: TableColumn[] =
    [
      {
        field: 'ClassroomId',
        headerName: 'SR.No',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200,
      },
      {
        field: 'BranchName',
        headerName: 'Branch Name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200,
      },
      {
        field: 'ClassroomName',
        headerName: 'Classroom Name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200

      },
      {
        field: 'StudentCapacity',
        headerName: 'Student Capacity',
        filter: 'agSetColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200

      },
      {
        field: 'IsActive',
        headerName: 'Course Status',
        filter: 'agTextColumnFilter',
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
      },{
        field: 'updatedDate',
        headerName: 'UpdatedDate',
        filter: 'agDateColumnFilter',
        filterParams: { buttons: ['reset', 'apply'] },
        minWidth: 150
      },
    ];
  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewClassroom',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },

  ];
  ngOnInit(): void {
    this.getClassroomDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addClassroomsService: AddClassroomsService) 
    {

    }
    onRowAction(data: any) {
      let data1 = {
        'source': 'edit',
        'ClassroomId': data.row.ClassroomId
      }
      this.router.navigate(['tds/masters/classrooms/add-classrooms'], { queryParams: data1 });
    }
    selectClassroom($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }
  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewClassroom',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  getClassroomDetails() {
    this.addClassroomsService.getClassroomList().subscribe((result: any) => {
      this.classroomDetailsList = result.Value;
      let classroomDetailsList = result.Value;
    })
  }
  onAddClassroom(classroom?: any) {

    let navigationExtras: NavigationExtras = {};
    if (classroom) {
      navigationExtras = {
        state: {
          classroomData: classroom
        }
      };
    }
    this.router.navigateByUrl('tds/masters/classrooms/add-classrooms')
  }

  editClassroom(ClassroomData: any) {
    const classroomId = ClassroomData.classroomId;
    const index = this.classroomDetailsList.findIndex(classroom => classroom.classroomId === classroomId);

    if (index !== -1) {


      this.openEditForm(ClassroomData).then((editedClassroomData: any) => {

        this.classroomDetailsList[index] = editedClassroomData;
        console.log('Edited Classroom:', editedClassroomData);

      });
    }
  }
  openEditForm(classroomData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedClassroomData = { ...classroomData };

        editedClassroomData.Status = 'Edited';
        resolve(editedClassroomData);
      }, 1000);
    });
  }
}



