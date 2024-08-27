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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewClassroom',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip: 'Edit Classroom'
    },
  ];
  declaredTableColumns: TableColumn[] =
    [
      {
        field: 'ClassroomId',
        headerName: 'SR.No',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 100,
         headerTooltip: 'Serial Number'
      },
      {
        field: 'BranchName',
        headerName: 'Branch Name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200,
         headerTooltip: 'Branch Name'
      },
      {
        field: 'ClassroomName',
        headerName: 'Classroom Name',
        filter: 'agTextColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200,
        headerTooltip: 'Classroom Name'
      },
      {
        field: 'StudentCapacity',
        headerName: 'Student Capacity',
        filter: 'agSetColumnFilter',
        filterParams: {
          buttons: ['reset', 'apply'],
        },
        minWidth: 200,
        headerTooltip: 'Student Capacity'
      },
      // {
      //   field: 'IsActive',
      //   headerName: 'Course Status',
      //   filter: 'agTextColumnFilter',
      //   filterParams: {
      //     buttons: ['reset', 'apply'],
      //   },
      //   minWidth: 150,
      //   valueFormatter: params => {
      //     return params.value ? 'Active' : 'Inactive';
      //   }
      // },
      {
        field: 'addedBy',
        headerName: 'Added By',
        filter: 'agTextColumnFilter',
        filterParams: { buttons: ['reset', 'apply'] },
        minWidth: 150,
        headerTooltip: 'Added By'
      },
      {
        field: 'addedTime',
        headerName: 'Added Time',
        filter: 'agDateColumnFilter',
        filterParams: { buttons: ['reset', 'apply'] },
        minWidth: 150,
        headerTooltip: 'Added Time'
      },
      {
        field: 'updatedBy',
        headerName: 'Updated By',
        filter: 'agDateColumnFilter',
        filterParams: { buttons: ['reset', 'apply'] },
        minWidth: 150,
        headerTooltip: 'Updated By'
      },
      {
        field: 'updatedTime',
        headerName: 'Updated Time',
        filter: 'agDateColumnFilter',
        filterParams: { buttons: ['reset', 'apply'] },
        minWidth: 150,
         headerTooltip: 'Updated Time'
      },
    ];

    ngOnInit(): void {
      this.getClassroomDetails();
    }

    constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addClassroomsService: AddClassroomsService) { }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'ClassroomId': data.row.ClassroomId
    }
    this.router.navigate(['tds/masters/classrooms/add-classrooms'], { queryParams: data1 });
  }

  selectClassroom($event: any) {
    throw new Error('Method not implemented.');
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getClassroomDetails() {
    this.addClassroomsService.getClassroomList().subscribe((result: any) => {
      this.classroomDetailsList = result.Value;
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

}



