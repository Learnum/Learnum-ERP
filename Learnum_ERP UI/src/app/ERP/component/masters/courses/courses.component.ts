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

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'Viewcourse',
      actionIcon: 'uil uil-pen rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4',
      tooltip:'Edit Course'
    },
  ];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'CourseId',
      headerName: 'SR.NO',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
       headerTooltip: 'SR.NO'
    },
    {
      field: 'CourseName',
      headerName: 'Courses Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Courses Name'
    },
    {
      field: 'Description',
      headerName: 'Description',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150,
      headerTooltip: 'Description'

    },
    // {
    //   field: 'IsActive',
    //   headerName: 'Course Status',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 150,
    // },

    {
      field: 'AddedBy',
      headerName: 'Added By',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added By'
    },
    {
      field: 'AddedDate',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip: 'Added Time'
    },
    {
      field: 'UpdatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By'
    },
    {
      field: 'UpdatedDate',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
       headerTooltip: 'Updated Time'
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
    })
  }
}


