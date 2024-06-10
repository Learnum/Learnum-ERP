import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn, ActionColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';


@Component({
  selector: 'app-add-practical-problem-solution',
  templateUrl: './add-practical-problem-solution.component.html',
  styleUrls: ['./add-practical-problem-solution.component.scss']
})
export class AddPracticalProblemSolutionComponent implements OnInit {
  practicalProblemList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'ProblemId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 80
    },
    {
      field: 'question',
      headerName: 'Question',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300
    },
    {
      field: 'attachment',
      headerName: 'Attachment',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300
    },
    {
      field: 'marks',
      headerName: 'Marks',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'status',
      headerName: 'Practical Problem Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
    },
    {
      field: 'answer',
      headerName: 'Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100
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
    private alertService: AlertService,) { }

    ngOnInit(): void {
      this.getPracticalProblemList();
    }
  
    getPracticalProblemList() {
      // Fetch the list of practical problems from the service
      // this.practicalProblemService.getPracticalProblemList().subscribe(
      //   (result: any) => {
      //     this.practicalProblemList = result.Value;
      //   },
      //   (error: any) => {
      //     console.error("Error occurred while fetching practical problems:", error);
      //     this.alertService.ShowErrorMessage("An error occurred while fetching practical problems. Please try again later.");
      //   }
      // );
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
}
