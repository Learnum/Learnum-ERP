import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MessageService } from 'src/app/core/services/message.service';
import { AlertService } from 'src/app/core/services/alertService';
import { TableColumn,ActionColumn  } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { SyllabuscompletionService } from './syllabus-completion/syllabuscompletion.service';
@Component({
  selector: 'app-trainer-dashboard',
  templateUrl: './trainer-dashboard.component.html',
  styleUrls: ['./trainer-dashboard.component.scss']
})
export class TrainerDashboardComponent implements OnInit {

  syllabusDetailsList: any[] = [];

  declaredTableColumns: TableColumn[] = [
    {
      field: 'TrainerId',
      headerName: 'SR.No',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200,
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agTextColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private syllabuscompletionService:SyllabuscompletionService
  ) { }

  ngOnInit(): void {
    this. getSyllabusDetails();
  }
  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewBranch',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  ActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewEmployee',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];
  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'TrainerId': data.row.TrainerId
    }
    this.router.navigate(['tds/trainer-dashboard/syllabus-completion'], { queryParams: data1 });
  }
  selectSyllabus($event: any)
   {
    throw new Error('Method not implemented.');
  }
  onAddSyallbus(syllabus?: any) {

    let navigationExtras: NavigationExtras = {};
    if (syllabus) {
      navigationExtras = {
        state: {
          syllabusData: syllabus
        }
      };
    }
    this.router.navigateByUrl('tds/trainer-dashboard/syllabus-completion')
  }
  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }
  editSyllabus(SyllabusData: any) {
    const trainerId = SyllabusData.trainerId;
    const index = this.syllabusDetailsList.findIndex(trainer => trainer.trainerId === trainerId);

    if (index !== -1) {


      this.openEditForm(SyllabusData).then((editedSyllabusData: any) => {

        this.syllabusDetailsList[index] = editedSyllabusData;
        console.log('Edited Syllabus:', editedSyllabusData);

      });
    }
  }
  openEditForm(trainerData: any): Promise<any> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const editedSyllabusData = { ...trainerData };

        editedSyllabusData.Status = 'Edited';
        resolve(editedSyllabusData);
      }, 1000);
    });
  }

  getSyllabusDetails() {
    this.syllabuscompletionService.getSyllabusList().subscribe((result: any) => {
      this.syllabusDetailsList = result.Value;
      let syllabusDetailsList = result.Value;
    })
  } 

}
