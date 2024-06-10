import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  studentList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'studentName',
      headerName: 'Student Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'studentEmail',
      headerName: 'Student Email',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'studentPhoto',
      headerName: 'Student\'s Photo',
      cellRenderer: (params: any) => `<img src="${params.value}" alt="Student Photo" style="width: 50px; height: 50px;"/>`,
      minWidth: 150
    },
    {
      field: 'studentPhone',
      headerName: 'Student Phone',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'aadharNumber',
      headerName: 'AAdhar Number',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    },
    {
      field: 'education',
      headerName: 'Education',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewStudent',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditStudent',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList() {
    // this.studentService.getStudentList().subscribe(
    //   (result: any) => {
    //     this.studentList = result.Value;
    //   },
    //   (error: any) => {
    //     console.error("Error occurred while fetching student list:", error);
    //     this.alertService.ShowErrorMessage("An error occurred while fetching student list. Please try again later.");
    //   }
    // );
  }

  AddStudent() {
    this.router.navigate(['tds/student-management/student-add']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'StudentId': data.row.StudentId
    };
    this.router.navigate(['/tds/student-management/student-add'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }

  selectStudent(students: any) {
    // Handle row selection logic
  }
}

