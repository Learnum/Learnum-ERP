import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alertService';
import { MessageService } from 'src/app/core/services/message.service';
import { ActionColumn, TableColumn } from 'src/app/shared/data-grid/model/data-grid-column.model';
import { AddtrainerService } from './add-trainer/addtrainer.service';
import { ResponseCode } from 'src/app/core/models/responseObject.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit {
  trainerList: any[] = [];
  form: FormGroup;

  declaredTableColumns: TableColumn[] = [
    // {
    //   field: 'TrainerId',
    //   headerName: 'SR.NO',
    //   filter: 'agTextColumnFilter',
    //   filterParams: {
    //     buttons: ['reset', 'apply'],
    //   },
    //   minWidth: 100
    // },
    {
      field: 'TrainerName',
      headerName: 'Trainer name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200
    },
    {
      field: 'BranchName',
      headerName: 'Branch Name',
      filter: 'agSetColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 150
    },
    
    {
      field: 'CourseName',
      headerName: ' Course Name',
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      minWidth: 200
    },
    {
      field: 'IsActive',
      headerName: 'Trainer Status',
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
      field: 'updatedDate',
      headerName: 'UpdatedDate',
      filter: 'agDateColumnFilter',
      filterParams: { buttons: ['reset', 'apply'] },
      minWidth: 150
    }
  ];

  declaredActionColumns: ActionColumn[] = [
    {
      action: 'view',
      actionPage: 'ViewTrainer',
      actionIcon: 'uil uil-cog rounded text-secondary mb-0',
      buttonClass: 'btn btn-sm btn-secondary',
      colorClass: 'text-secondary h4'
    },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertService: AlertService,
    private addtrainerService: AddtrainerService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllTrainerDetails();
  }

  selectTrainer(trainer: any) {
    // Implement this method based on your requirements
  }

  onRowAction(data: any) {
    let data1 = {
      'source': 'edit',
      'TrainerId': data.row.TrainerId
    };
    this.router.navigate(['tds/hrd/trainer/add-trainer'], { queryParams: data1 });
  }

  onAddTrainer() {
    this.router.navigate(['tds/hrd/trainer/add-trainer']);
  }

  onActionButton(action: string) {
    alert(action + ' ' + 'action button clicked.');
  }

  getAllTrainerDetails() {
    this.addtrainerService.getTrainerList().subscribe((result: any) => {
      this.trainerList = result.Value;
    });
  }

  editTrainer(trainerData: any) {
    const trainerId = trainerData.trainerId;
    const index = this.trainerList.findIndex(trainer => trainer.trainerId === trainerId);

    if (index !== -1) {
      this.openEditForm(trainerData).then((editedTrainerData: any) => {
        this.trainerList[index] = editedTrainerData;
        console.log('Edited Trainer:', editedTrainerData);
      });
    }
  }

  openEditForm(trainerData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const editedTrainerData = { ...trainerData };
        editedTrainerData.Status = 'Edited';
        resolve(editedTrainerData);
      }, 1000);
    });
  }
}
