import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CounsellorDashboardRoutingModule } from './counsellor-dashboard-routing.module';
import { CounsellorDashboardComponent } from './counsellor-dashboard.component';

import { CallWithStudentLeadModule } from './call-with-student-lead/call-with-student-lead.module';
import { AddCollegsModule } from './colleges/add-collegs/add-collegs.module';
import { CounsellingWithStudentModule } from './counselling-with-student/counselling-with-student.module';
import { ScheduleMeetingWithCollegeModule } from './schedule-meeting-with-college/schedule-meeting-with-college.module';
import { ScheduleSeminarWithCollegeModule } from './schedule-seminar-with-college/schedule-seminar-with-college.module';
import { WebsiteLeadsModule } from './website-leads/website-leads.module';


@NgModule({
  declarations: [
    // ScheduleMeetingWithCollegeComponent,
    // ScheduleSeminarWithCollegeComponent,
    // StudentLeadsComponent,
    // WebsiteLeadsComponent,
    // CallWithStudentLeadComponent,
    // CounsellingWithStudentComponent,
    CounsellorDashboardComponent
  ],
  imports: [
    CommonModule,
    CounsellorDashboardRoutingModule,
    RouterModule,
    SharedModule,
    CallWithStudentLeadModule,
    AddCollegsModule,
    CounsellingWithStudentModule,
    ScheduleMeetingWithCollegeModule,
    ScheduleSeminarWithCollegeModule,
    WebsiteLeadsModule
  ]
})
export class CounsellorDashboardModule { }
