import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  onRowAction($event: any) {
    throw new Error('Method not implemented.');
  }

  classroomDetailsList: any[] = [];
  form: FormGroup;
  getEmployeeList: any;
  declaredTableColumns: TableColumn[] =
    [
      {
        field: 'ClassRoomId',
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
        field: 'classroomName',
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
      actionPage: 'ViewCall',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditCall',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }

  ];
  ngOnInit(): void {
    this.getClassroomDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addClassroomsService: AddClassroomsService,
    private formBuilder: FormBuilder) {
    {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
    }
  }
  selectBranch(branch: any) {

  }

  ActionColumn: any[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  onAddclass() {
    this.router.navigate(['tds/masters/classrooms/add-classrooms']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getClassroomDetails() {
    this.addClassroomsService.getClassroomList().subscribe((result: any) => {
      this.classroomDetailsList = result.Value;
      let classroomDetailsList = result.Value;
    })
  }
}



