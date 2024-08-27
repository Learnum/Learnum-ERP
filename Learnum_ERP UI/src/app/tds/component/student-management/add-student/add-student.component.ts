import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddstudentService } from './student-add/addstudent.service';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  addStudentList: any[] = [];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'View',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Student'
    }, 
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'StudentId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'SR.NO'

    },
    {
      field: 'StudentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Student Name'

    },
    {
      field: 'StudentEmail',
      headerName: 'Student Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Student Email'

    },
    {
      field: 'StudentPhone',
      headerName: 'StudentPhone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'StudentPhone'

    },
    {
      field: 'AadharNumber',
      headerName: 'AadharNumber',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'AadharNumber'

    },
    {
      field: 'DateofBirth',
      headerName: 'DateofBirth',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'DateofBirth'

    },
    {
      field: 'Education',
      headerName: 'Education',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip:'Education'

    },
    {
      field: 'IsActive',
      headerName: 'Student Status',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip:'Student Status',
      valueFormatter: params => {
        return params.value ? 'Active' : 'Inactive';
      }
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

  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private addstudentService:AddstudentService) {}

  ngOnInit(): void {
    this.getAddStudentList();
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'StudentId': data.row.StudentId
    }
    this.router.navigate(['tds/student-management/student-add'], { queryParams: data1 });
  }
  selectStudent($event: any)
   {
    throw new Error('Method not implemented.');
  }


  onAddStudent(student?: any) {

    let navigationExtras: NavigationExtras = {};
    if (student) {
      navigationExtras = {
        state: {
          studentData: student
        }
      };
    }
    this.router.navigateByUrl('tds/student-management/student-add')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editStudent(StudentData: any) {
    const studentId = StudentData.studentId;
    const index = this.addStudentList.findIndex(student => student.studentId === studentId);

    if (index !== -1) {


      this.openEditForm(StudentData).then((editedStudentData: any) => {

        this.addStudentList[index] = editedStudentData;
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
  getAddStudentList() {
    this.addstudentService.getAddStudentList().subscribe((result: any) => {
      this.addStudentList = result.Value;
      let addStudentList = result.Value;
    })
  }
}

