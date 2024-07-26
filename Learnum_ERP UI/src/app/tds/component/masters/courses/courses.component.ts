import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddCoursesService } from './add-courses/add-courses.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courseList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CourseId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'CourseName',
      headerName: 'Courses Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    {
      field: 'Description',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150

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
    }, {
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
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  ngOnInit(): void {
    this.getAllCoursesDetails();
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private addCoursesService: AddCoursesService,
    private alertService: AlertService,
    private formBuilder: FormBuilder) { }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'CourseId': data.row.CourseId
    }
    this.router.navigate(['tds/masters/courses/add-courses'], { queryParams: data1 });
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewCourse',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  onAddCourse(course?: any) {
    let navigationExtras: NavigationExtras = {};
    if (course) {
      navigationExtras = {
        state: {
          courseData: course
        }
      };
    }
    this.router.navigateByUrl('tds/masters/courses/add-courses')
  }

  selectCourse($event: any) {
    throw new Error('Method not implemented.');
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getAllCoursesDetails() {
    this.addCoursesService.getCourseList().subscribe((result: any) => {
      this.courseList = result.Value;
      let courseList = result.Value;
    })
  }
  editCourse(CourseData: any) {
    const courseId = CourseData.courseId;
    const index = this.courseList.findIndex(course => course.courseId === courseId);
    if (index !== -1) {
      this.openEditForm(CourseData).then((editedCourseData: any) => {
        this.courseList[index] = editedCourseData;
        console.log('Edited course:', editedCourseData);
      });
    }
  }
  openEditForm(courseData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedcourseData = { ...courseData };
        editedcourseData.Status = 'Edited';
        resolve(editedcourseData);
      }, 1000);
    });
  }

}
