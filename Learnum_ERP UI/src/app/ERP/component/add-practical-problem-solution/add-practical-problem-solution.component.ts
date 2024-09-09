import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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

  declaredTableColumns: TableColumn[] = [
    {
      field: 'QuestionId',
      headerName: 'ID',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 80,
      headerTooltip: 'Question Id',
    },
    {
      field: 'Question',
      headerName: 'Question',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300,
      headerTooltip: 'Question',
    },
    {
      field: 'ModelAnswer',
      headerName: 'Model Answer',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 300,
      headerTooltip: 'Model Answer',
    },
    {
      field: 'Marks',
      headerName: 'Marks',
      filter: 'agNumberColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
      headerTooltip: 'Marks',
    },
    {
      field: 'IsActive',
      headerName: 'Practical Problem Status',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 100,
      headerTooltip: 'Practical Problem Status',
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
      headerTooltip: 'Added By',
    },
    {
      field: 'addedTime',
      headerName: 'Added Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Added Time',
    },
    {
      field: 'updatedBy',
      headerName: 'Updated By',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated By',
    },
    {
      field: 'updatedTime',
      headerName: 'Updated Time',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150,
      headerTooltip: 'Updated Time',
    }, 
    
  ];

  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private practicalProblemsStudentsService: PracticalProblemsStudentsService
  ) { }

  ngOnInit(): void {
    this.getAllBranchDetails();
  }
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'QuestionId': data.row.QuestionId
    }
    this.router.navigate(['erp/add-practical-problem-solution/practical-problems-students'], { queryParams: data1 });
  }
  selectPractical($event: any)
   {
    throw new Error('Method not implemented.');
  }

  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewPractical',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onAddPractical(practical?: any) {

    let navigationExtras: NavigationExtras = {};
    if (practical) {
      navigationExtras = {
        state: {
          practicalData: practical
        }
      };
    }
    this.router.navigateByUrl('erp/add-practical-problem-solution/practical-problems-students')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  getAllBranchDetails() {
    this.practicalProblemsStudentsService.getPracticalProblemList().subscribe((result: any) => {
      this.practicalProblemList = result.Value;
      let practicalProblemList = result.Value;
    })
  }
  editPractical(PracticalData: any) {
    const questionId = PracticalData.questionId;
    const index = this.practicalProblemList.findIndex(practical => practical.questionId === questionId);

    if (index !== -1) {


      this.openEditForm(PracticalData).then((editedPracticalData: any) => {

        this.practicalProblemList[index] = editedPracticalData;
        console.log('Edited Practical:', editedPracticalData);

      });
    }
  }
  openEditForm(practicalData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedPracticalData = { ...practicalData };

        editedPracticalData.Status = 'Edited';
        resolve(editedPracticalData);
      }, 1000);
    });
  }
}
