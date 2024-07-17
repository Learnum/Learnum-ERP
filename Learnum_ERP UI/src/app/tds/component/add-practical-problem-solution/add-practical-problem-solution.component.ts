import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { PracticalProblemsStudentsService } from './practical-problems-students/practical-problems-students.service';


@Component({
  selector: 'app-add-practical-problem-solution',
  templateUrl: './add-practical-problem-solution.component.html',
  styleUrls: ['./add-practical-problem-solution.component.scss']
})
export class AddPracticalProblemSolutionComponent implements OnInit {
  practicalProblemList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'QuestionId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 80
    },
    {
      field: 'Question',
      headerName: 'Question',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300
    },
    {
      field: 'ModelAnswer',
      headerName: 'Model Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300
    },
    {
      field: 'Marks',
      headerName: 'Marks',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'IsActive',
      headerName: 'Practical Problem Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
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
      actionPage: 'ViewBusinessLead',
      actionIcon: 'uil uil-eye rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
    {
      action: 'edit',
      actionPage: 'EditBusinessLead',
      actionIcon: 'uil uil-edit rounded text-primary mb-0',
      buttonClass: 'btn btn-sm btn-primary',
      colorClass: 'text-primary h4'
    }
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private practicalProblemsStudentsService:PracticalProblemsStudentsService
  ) { }

    ngOnInit(): void {
     this.getAllBranchDetails();
    }
  



  onAddPracticalProblems() {
    this.router.navigate(['tds/add-practical-problem-solution/practical-problems-students']);
  }

  onRowAction(data: any) {
    let data1 = {
      'source': data.action,
      'ProblemId': data.row.ProblemId
    };
    this.router.navigate(['/tds/add-practical-problem-solution/practical-problems-students'], { queryParams: data1 });
  }

  onActionButton(action: string) {
    alert(action + ' action button clicked.');
  }
  selectPracticalProblem(event: any) {
    // handle selected rows
    console.log('Selected practical problem:', event);
  }

  getAllBranchDetails() {
    this.practicalProblemsStudentsService.getPracticalProblemList().subscribe((result: any) => {
      this.practicalProblemList = result.Value;
      let practicalProblemList = result.Value;
    })
  }
}
