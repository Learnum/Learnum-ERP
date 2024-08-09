import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { StudentcounsellingService } from './counselling-student/studentcounselling.service';
@Component({
  selector: 'app-counselling-with-student',
  templateUrl: './counselling-with-student.component.html',
  styleUrls: ['./counselling-with-student.component.scss']
})
export class CounsellingWithStudentComponent implements OnInit {

  StudentCounsellingList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CounsellingId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Phone',
      headerName: 'Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingConversation',
      headerName: 'Counselling Conversation',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingTime',
      headerName: 'Counselling Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CounsellingStatus',
      headerName: 'Counselling Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewStudent',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  constructor(
    private router: Router,
    private alertService: AlertService,
    private messageService: MessageService,
    private activateRoute: ActivatedRoute,
    private studentcounsellingService:StudentcounsellingService
  ) { }

  ngOnInit(): void {
    this.getStudentCounsellingDetails();
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CounsellingId': data.row.CounsellingId
    }
    this.router.navigate(['tds/counsellor-dashboard/counselling-with-student/counselling-student'], { queryParams: data1 });
  }
  selectStudentCounselling($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewStudent',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddStudentCounselling(student?: any) {

    let navigationExtras: NavigationExtras = {};
    if (student) {
      navigationExtras = {
        state: {
          studentData: student
        }
      };
    }
    this.router.navigateByUrl('tds/counsellor-dashboard/counselling-with-student/counselling-student')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editPractical(StudentData: any) {
    const counsellingId = StudentData.counsellingId;
    const index = this.StudentCounsellingList.findIndex(student => student.counsellingId === counsellingId);

    if (index !== -1) {


      this.openEditForm(StudentData).then((editedStudentData: any) => {

        this.StudentCounsellingList[index] = editedStudentData;
        console.log('Edited Student:', editedStudentData);

      });
    }
  }
  openEditForm(studentData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedStudentData = { ...studentData };

        editedStudentData.Status = 'Edited';
        resolve(editedStudentData);
      }, 1000);
    });
  }
  getStudentCounsellingDetails() {
    this.studentcounsellingService.getStudentCounsellingDetails().subscribe((result: any) => {
      this.StudentCounsellingList = result.Value;
      let StudentCounsellingList = result.Value;
    })
  }

}
