import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AdmissionService } from './add-admissions/admission.service';

@Component({
  selector: 'app-student-admission',
  templateUrl: './student-admission.component.html',
  styleUrls: ['./student-admission.component.scss']
})
export class StudentAdmissionComponent implements OnInit {

  studentAdmissionList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'DateOfAdmission',
      headerName: 'Date of Admission',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Date of Admission'

    },
    {
      field: 'CourseName',
      headerName: 'Course Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Course Name'

    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Modified By'

    },
    {
      field: 'BatchName',
      headerName: 'Batch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Batch Name'

    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Student Name'

    },
    {
      field: 'StudentNumber',
      headerName: 'Student Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 120,
      headerTooltip: 'Modified By'

    },
    {
      field: 'IsActive',
      headerName: 'Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
      headerTooltip: 'Status',
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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit'
    },
  ];

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private admissionService: AdmissionService,
  ) { }

  ngOnInit(): void {
    this.getStudentAdmissionsDetails();
  }
  onStudentAdmission(admission?: any) {

    let navigationExtras: NavigationExtras = {};
    if (admission) {
      navigationExtras = {
        state: {
          admissionData: admission
        }
      };
    }
    this.router.navigateByUrl('erp/student-management/add-admissions')
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'AdmissionId': data.row.AdmissionId
    }
    this.router.navigate(['/erp/student-management/add-admissions'], { queryParams: data1 });
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  selectstudentAdmission($event: any) 
  { 
    throw new Error('Method not implemented.'); 
  }

  getStudentAdmissionsDetails() {
    this.admissionService.getStudentAdmissionsList().subscribe((result: any) => {
      this.studentAdmissionList = result.Value;
      let studentAdmissionList = result.Value;
    })
  }
}
