import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { StudentleadsService } from './add-student-leads/studentleads.service';
@Component({
  selector: 'app-student-leads',
  templateUrl: './student-leads.component.html',
  styleUrls: ['./student-leads.component.scss']
})
export class StudentLeadsComponent implements OnInit {

  studentLeadList: any[] = [];

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
      field: 'StudentId',
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
      field: 'StudentPhone',
      headerName: 'Student Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'ParentPhone',
      headerName: "Parent's Phone",
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'StudentEmail',
      headerName: 'Student Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'CollegeName',
      headerName: 'College Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Education',
      headerName: 'Education',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'Address',
      headerName: 'Address',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'LeadSource',
      headerName: 'Lead Source',
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

 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private studentleadsService:StudentleadsService
  ) { }

  ngOnInit(): void {
    this.getStudentLeadsDetails();
  }


  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'StudentId': data.row.StudentId
    }
    this.router.navigate(['tds/counsellor-dashboard/student-leads/add-student-leads'], { queryParams: data1 });
  }
  selectStudent($event: any)
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
  onAddStudent(student?: any) {

    let navigationExtras: NavigationExtras = {};
    if (student) {
      navigationExtras = {
        state: {
          studentData: student
        }
      };
    }
    this.router.navigateByUrl('tds/counsellor-dashboard/student-leads/add-student-leads')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editStudent(StudentData: any) {
    const studentId = StudentData.studentId;
    const index = this.studentLeadList.findIndex(student => student.studentId === studentId);

    if (index !== -1) {


      this.openEditForm(StudentData).then((editedStudentData: any) => {

        this.studentLeadList[index] = editedStudentData;
        console.log('Edited student:', editedStudentData);

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
  getStudentLeadsDetails() {
    this.studentleadsService.getStudentLeads().subscribe((result: any) => {
      this.studentLeadList = result.Value;
      let studentLeadList = result.Value;
    })
  }
}
