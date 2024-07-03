//Core Modules
import { DEFAULT_CURRENCY_CODE, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Third Party Componants
import {
  NgbAccordionModule,
  NgbPopoverModule,
} from "@ng-bootstrap/ng-bootstrap";
import { POIRouting } from "./tds-routing.module";
import { TaxationLayoutModule } from "./tds-layout/tds-layout.module";
//import { TDSReturnDashboardService } from "./component/tds-return-dashboard/tds-return-dashboard.service";
import { MastersComponent } from './component/masters/masters.component';
import { VerticalLayoutComponent } from './vertical-layout/vertical-layout.component';
// import { VerticalLayoutComponent } from './vertical-layout/vertical-layout.component';
//import { HrdComponent } from './component/hrd/hrd.component';
//import { MySyllabusComponent } from './component/my-syllabus/my-syllabus.component';
//import { StudentManagementComponent } from './component/student-management/student-management.component';
//import { TrainerDashboardComponent } from './component/trainer-dashboard/trainer-dashboard.component';
//import { CounsellorDashboardComponent } from './component/counsellor-dashboard/counsellor-dashboard.component';
// import { CounselorsPlanningComponent } from './component/counselors-planning/counselors-planning.component';
// import { PracticalProblemExamsComponent } from './component/practical-problem-exams/practical-problem-exams.component';
// import { SchedulePracticalProblemComponent } from './component/practical-problem-exams/schedule-practical-problem/schedule-practical-problem.component';
// import { MyPracticalExamComponent } from './component/my-practical-exam/my-practical-exam.component';
// import { AddPracticalProblemSolutionComponent } from './component/add-practical-problem-solution/add-practical-problem-solution.component';

// import { BusinessLeadComponent } from './component/business-lead/business-lead.component';
//import { MyDashboardERPComponent } from './component/my-dashboard-erp/my-dashboard-erp.component';




@NgModule({
  imports: [
    TaxationLayoutModule,
    CommonModule,
    FormsModule,
    POIRouting,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbPopoverModule,
 
  ],

  declarations: [
  
  
    MastersComponent,
            VerticalLayoutComponent,
            //VerticalLayoutComponent,
          // HrdComponent,
          // MySyllabusComponent,
           //StudentManagementComponent,
           //TrainerDashboardComponent,
          // CounsellorDashboardComponent,
          //  CounselorsPlanningComponent,
          //  PracticalProblemExamsComponent,
          //  SchedulePracticalProblemComponent,
          //  MyPracticalExamComponent,
          //  AddPracticalProblemSolutionComponent,
          //  BusinessLeadComponent,
          // MyDashboardERPComponent,
          // MyDasboardComponent,
           //MyDashboardComponent,
         
  ],

  exports: [FormsModule,ReactiveFormsModule],

  providers: [
    //TDSReturnDashboardService
  ],
})
export class POIModule {}
