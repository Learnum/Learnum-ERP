import { Routes, RouterModule } from "@angular/router";

import { TDSLayoutComponent } from "./tds-layout/tds-layout.component";


const poiRoutes: Routes = [

  {
    path: '',
    component: TDSLayoutComponent,

    children: [

     
      // {

      //   path: 'tds-return',
      //   loadChildren: () =>
      //     import('./component/tds-return/tds-return.module').then(
      //       (m) => m.TDSRETURNModule
      //     ),

      // },
      {

        path: 'my-dashboard-erp',
        loadChildren: () =>
          import('./component/my-dashboard-erp/my-dashboard-erp.module').then(
            (m) => m.MyDashboardErpModule
          ),

      },
      {
        path: 'masters',
        loadChildren: () =>
          import('./component/masters/masters.module').then(
            (m) => m.MastersModule
          ),

      },
      {
        path: 'hrd',
        loadChildren: () =>
          import('./component/hrd/hrd.module').then(
            (m) => m.HrdModule
          ),

      },
      {
        path: 'my-syllabus',
        loadChildren: () =>
          import('./component/my-syllabus/my-syllabus.module').then(
            (m) => m.MySyllabusModule
          ),
      },

      {
        path: 'business-lead',
        loadChildren: () =>
          import('./component/business-lead/business-lead.module').then(
            (m) => m.BusinessLeadModule
          ),
      },
      {
        path: 'add-practical-problem-solution',
        loadChildren: () =>
          import('./component/add-practical-problem-solution/add-practical-problem-solution.module').then(
            (m) => m.AddPracticalProblemSolutionModule
          ),
      },
      
      {
        path: 'my-practical-exam',
        loadChildren: () =>
          import('./component/my-practical-exam/my-practical-exam.module').then(
            (m) => m.MyPracticalExamModule
          ),
      },
      {
        path: 'practical-problem-exams',
        loadChildren: () =>
          import('./component/practical-problem-exams/practical-problem-exams.module').then(
            (m) => m.PracticalProblemExamsModule
          ),
      },
      {
        path: 'counsellor-dashboard',
        loadChildren: () =>
          import('./component/counsellor-dashboard/counsellor-dashboard.module').then(
            (m) => m.CounsellorDashboardModule
          ),
      },
      {
        path: 'trainer-dashboard',
        loadChildren: () =>
          import('./component/trainer-dashboard/trainer-dashboard.module').then(
            (m) => m.TrainerDashboardModule
          ),
      },
      {
        path: 'student-management',
        loadChildren: () =>
          import('./component/student-management/student-management.module').then(
            (m) => m.StudentManagementModule
          ),
      },
      {
        path: 'counselors-planning',
        loadChildren: () =>
          import('./component/counselors-planning/counselors-planning.module').then(
            (m) => m.CounselorsPlanningModule
          ),
      },



    ],
  }
];

export const POIRouting = RouterModule.forChild(poiRoutes);
