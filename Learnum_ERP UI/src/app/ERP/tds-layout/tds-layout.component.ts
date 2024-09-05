import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationSettings } from 'src/app/core/models/configuration';
import { IdentityUser } from 'src/app/core/models/identty-user.model';
import { ResponseCode } from 'src/app/core/models/responseObject.model';
import { RoleDetails } from 'src/app/core/models/role-Details';
import { AlertService } from 'src/app/core/services/alertService';
import { CoreMenuService } from 'src/app/core/services/core-menu.service';
import { MessageService } from 'src/app/core/services/message.service';
import { UserProfileService } from 'src/app/core/services/user-profile.service';
import { CommunicationType } from 'src/app/shared/Models/communication-type.model';
import { MessageSendModel } from 'src/app/shared/Models/message-send.model';
import { UserCommunicationMappingModel } from 'src/app/shared/Models/user-communication-mapping.model';
import { CommunicationService } from 'src/app/shared/services/communication.service';
//import { AuthService } from '../component/authentication/login/authService';
import { TDSLayoutService } from './tds-layout.service';
import { environment } from 'src/environments/environment';
//import { PANAadharLinkVerificationService } from '../component/employee/panaadhar-link-verification/panaadhar-link-verification.service';


@Component({
  selector: 'tds-layout',
  templateUrl: './tds-layout.component.html',
  styleUrls: ['./tds-layout.component.scss'],

})
export class TDSLayoutComponent implements OnInit {
  isOpenMessagePopup: boolean;
  readMessage: boolean = false;
  isSidebar: boolean = false;
  UserRole: string;
  UserName: string;
  public RollName: any;
  public currentUser: IdentityUser;
  RoleList: Array<any> = [];
  RoleId: number = 0;
  layoutDetails: any
  UserRoleID: number;
  Menu: any;
  hideSidebar: boolean = false;
  closeid: string = '';
  closeMenu: boolean = false;
  test2: string;
  isSecondClick: boolean = true;
  public notificationData: Array<any> = [];
  public isNotificationPresent: boolean = false;
  messageBy: string;
  messageByDate: Date;
  modalTitle: string;
  modalDetailedInfo: string;
  panAadhaarLink: boolean = false;
  readChatMessage: boolean = false
  ToUserListOfMessage: any;
  selectedUser: any;
  data1 = 1212;
  messageSendModel = new MessageSendModel();
  MessageList: any;
  ToAllExpertAssistantsAdminList: any;
  adminListView: boolean = false;
  adminMessage: boolean = false;
  gotoHomeList: boolean = true
  GetMessageOfCount: any;
  EmpId: string;
  companyLogoUrl: string;
  companyMobileLogoUrl: string;
  CycleTypeId: any;
  hideLeftContent: boolean = false;
  searchText: string = '';
  filteredUserList: any;
  filteredUserList2: any;
  totalMessageCount: number = 0;
  MessageSendButton: boolean = false;
  searchText1: any;
  searchText2: any;
  employeeTypeDetailsId: any;
  IsVerify: boolean = false;
  isDisabledForVerifyPending: boolean = false;
  isPanAadharVerificationRequired: number = 0;
  messagee: string = '';
  /**
  * Constructor
  *
  * @param {CoreMenuService} _coreMenuService
  */

  

  constructor(
    private eRef: ElementRef,
    private _coreMenuService: CoreMenuService,
    private _userProfileService: UserProfileService,
    // private pANAadharLinkVerificationService: PANAadharLinkVerificationService,
    private poiLayoutService: TDSLayoutService,
    //private _authService: AuthService,
    private messageService: MessageService,

    private router: Router,
    //private pOILayoutService: POILayoutService,
    private alertService: AlertService,
    private communicationService: CommunicationService,

  ) {

    let companyUrl = localStorage.getItem('CompanyName')
    this.companyLogoUrl = `assets/images/taxblock/companyLogo/${companyUrl}.png`;
    this.companyMobileLogoUrl = `assets/images/taxblock/companyLogo/${companyUrl}_m.png`;

    this.Menu = [
     
      { id: 55, title: 'My Dashboard ERP', url: '/erp/my-dashboard-erp', type: 'no' },
      {
        id: 4, title: 'Masters', url: '/erp/masters', type: 'no',
        submenu: [
          { id: 5, title: 'Branches', url: '/erp/masters/branches', type: 'no' },
          { id: 6, title: 'IP Address', url: '/erp/masters/ip-address', type: 'no' },
          { id: 7, title: 'Classrooms', url: '/erp/masters/classrooms', type: 'no' },
          { id: 8, title: 'Courses', url: '/erp/masters/courses', type: 'no' },
          { id: 9, title: 'Subjects', url: '/erp/masters/subjects', type: 'no' },
          { id: 10, title: 'Batches', url: '/erp/masters/batches', type: 'no' },
        ]
      },

      {
        id: 11, title: 'HRD', url: '/erp/hrd', type: 'no',
        submenu: [
          { id: 12, title: 'Employees', url: '/erp/hrd/employees', type: 'no' },
          { id: 13, title: 'Trainer For Batch', url: '/erp/hrd/trainer', type: 'no' },
          { id: 14, title: 'Branch Manager For Branch', url: '/erp/hrd/branch-manager', type: 'no' },
          { id: 15, title: 'Content Writer For Subject', url: '/erp/hrd/content-writer', type: 'no' },
          { id: 16, title: 'Counsellor For Branch', url: '/erp/hrd/counsellor', type: 'no' },
          { id: 17, title: 'Accountant For Branch', url: '/erp/hrd/accountant', type: 'no' },
          { id: 18, title: 'Attendance Sheet', url: '/erp/hrd/attendance', type: 'no' },
          { id: 19, title: 'Daily Work Sheet', url: '/erp/hrd/daily-work', type: 'no' },
          { id: 20, title: 'All Birthdays', url: '/erp/hrd/birthdays', type: 'no' },
        ]
      },

      {
        id: 21, title: 'My Syllabus', url: '/erp/my-syllabus', type: 'no',
        submenu: [
          { id: 22, title: 'MY Syllabus', url: '/erp/my-syllabus/my-syllabus-erp', type: 'no' },
          { id: 23, title: 'My Exams', url: '/erp/my-syllabus/myexam', type: 'no' },
          { id: 24, title: 'MCQ Assignments', url: '/erp/my-syllabus/mcq-assignments', type: 'no' },
          { id: 25, title: 'Practical Problem', url: '/erp/my-syllabus/practical-problem', type: 'no' },
          { id: 26, title: 'General Exams', url: '/erp/my-syllabus/general-exam', type: 'no' },
          
        ]
      },

      {
        id: 31, title: 'Student Management', url: '/erp/student-management', type: 'no',
        submenu: [
          { id: 32, title: 'Add Students', url: '/erp/student-management/add-student', type: 'no' },
          { id: 33, title: 'Students Admissions', url: '/erp/student-management/student-admission', type: 'no' },
          { id: 34, title: 'Offline Fees Payment', url: '/erp/student-management/offline-fees-payment', type: 'no' },
          { id: 35, title: 'Send Fees Remider Report', url: '/erp/student-management/send-fees-reminder-report', type: 'no' },
          { id: 36, title: 'Students Admission Status', url: '/erp/student-management/student-admission-status', type: 'no' },
          { id: 37, title: 'Offline Fees Status', url: '/erp/student-management/offline-fees-status', type: 'no' },
        ]
      },

      { id: 38, title: 'Trainer Dashboard', url: '/erp/trainer-dashboard', type: 'no' },

      {
        id: 39, title: 'Counsellor Dashboard', url: '/erp/counsellor-dashboard', type: 'no',
        submenu: [
          { id: 40, title: 'Colleges', url: '/erp/counsellor-dashboard/colleges', type: 'no' },
          { id: 41, title: 'Schedule Meeting With College', url: '/erp/counsellor-dashboard/schedule-meeting-with-college', type: 'no' },
          { id: 42, title: 'Schedule Seminar With College', url: '/erp/counsellor-dashboard/schedule-seminar-with-college', type: 'no' },
          { id: 43, title: 'Student Leads', url: '/erp/counsellor-dashboard/student-leads', type: 'no' },
          { id: 44, title: 'Website Leads', url: '/erp/counsellor-dashboard/website-leads', type: 'no' },
          { id: 45, title: 'Call With Student Lead', url: '/erp/counsellor-dashboard/call-with-student-lead', type: 'no' },
          { id: 46, title: 'Counselling With Student', url: '/erp/counsellor-dashboard/counselling-with-student', type: 'no' },
        ]
      },

      {
        id: 47, title: 'Counselors Planing', url: '/erp/counselors-planning', type: 'no',
        submenu: [
          { id: 48, title: 'Trainers Planning', url: '/erp/counselors-planning/trainers-planning', type: 'no' },
          { id: 49, title: 'Batches Planning', url: '/erp/counselors-planning/batches-planning', type: 'no' },
        ]
      },

      {
        id: 50, title: 'Practical Problem Exams', url: '/erp/practical-problem-exams', type: 'no',
       
      },

      {
        id: 52, title: 'My Practical Exam', url: '/erp/my-practical-exam', type: 'no',
       
      },

      { id: 55, title: 'Add Practical Problems Subform', url: '/erp/add-practical-problem-solution', type: 'no' },

      {
        id: 56, title: 'Business Leads', url: '/erp/business-lead', type: 'no',
       
      },

      // {
      //   "id": 55,
      //   "title": "My Dashboard ERP",
      //   "url": "/tds/my-dashboard-erp",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": null
      // },
      // {
      //   "id": 4,
      //   "title": "Masters",
      //   "url": "/tds/masters",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 5,
      //       "title": "Branches",
      //       "url": "/tds/masters/branches",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 6,
      //       "title": "IP Address",
      //       "url": "/tds/masters/ip-address",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 7,
      //       "title": "Classrooms",
      //       "url": "/tds/masters/classrooms",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 8,
      //       "title": "Courses",
      //       "url": "/tds/masters/courses",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 9,
      //       "title": "Subjects",
      //       "url": "/tds/masters/subjects",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 10,
      //       "title": "Batches",
      //       "url": "/tds/masters/batches",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 11,
      //   "title": "HRD",
      //   "url": "/tds/hrd",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 12,
      //       "title": "Employees",
      //       "url": "/tds/hrd/employees",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 13,
      //       "title": "Trainer For Batch",
      //       "url": "/tds/hrd/trainer",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 14,
      //       "title": "Branch Manager For Branch",
      //       "url": "/tds/hrd/branch-manager",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 15,
      //       "title": "Content Writer For Subject",
      //       "url": "/tds/hrd/content-writer",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 16,
      //       "title": "Counsellor For Branch",
      //       "url": "/tds/hrd/counsellor",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 17,
      //       "title": "Accountant For Branch",
      //       "url": "/tds/hrd/accountant",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 18,
      //       "title": "Attendance Sheet",
      //       "url": "/tds/hrd/attendance",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 19,
      //       "title": "Daily Work Sheet",
      //       "url": "/tds/hrd/daily-work",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 20,
      //       "title": "All Birthdays",
      //       "url": "/tds/hrd/birthdays",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 21,
      //   "title": "My Syllabus",
      //   "url": "/tds/my-syllabus",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 22,
      //       "title": "MY Syllabus",
      //       "url": "/tds/my-syllabus/my-syllabus-erp",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 23,
      //       "title": "My Exams",
      //       "url": "/tds/my-syllabus/myexam",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 24,
      //       "title": "MCQ Assignments",
      //       "url": "/tds/my-syllabus/mcq-assignments",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 25,
      //       "title": "Practical Problem",
      //       "url": "/tds/my-syllabus/practical-problem",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 26,
      //       "title": "General Exams",
      //       "url": "/tds/my-syllabus/general-exam",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 31,
      //   "title": "Student Management",
      //   "url": "/tds/student-management",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 32,
      //       "title": "Add Students",
      //       "url": "/tds/student-management/add-student",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 33,
      //       "title": "Students Admissions",
      //       "url": "/tds/student-management/student-admission",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 34,
      //       "title": "Offline Fees Payment",
      //       "url": "/tds/student-management/offline-fees-payment",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 35,
      //       "title": "Send Fees Reminder Report",
      //       "url": "/tds/student-management/send-fees-reminder-report",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 36,
      //       "title": "Students Admission Status",
      //       "url": "/tds/student-management/student-admission-status",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 37,
      //       "title": "Offline Fees Status",
      //       "url": "/tds/student-management/offline-fees-status",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 38,
      //   "title": "Trainer Dashboard",
      //   "url": "/tds/trainer-dashboard",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": []
      // },
      // {
      //   "id": 39,
      //   "title": "Counsellor Dashboard",
      //   "url": "/tds/counsellor-dashboard",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 40,
      //       "title": "Colleges",
      //       "url": "/tds/counsellor-dashboard/colleges",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 41,
      //       "title": "Schedule Meeting With College",
      //       "url": "/tds/counsellor-dashboard/schedule-meeting-with-college",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 42,
      //       "title": "Schedule Seminar With College",
      //       "url": "/tds/counsellor-dashboard/schedule-seminar-with-college",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 43,
      //       "title": "Student Leads",
      //       "url": "/tds/counsellor-dashboard/student-leads",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 44,
      //       "title": "Website Leads",
      //       "url": "/tds/counsellor-dashboard/website-leads",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 45,
      //       "title": "Call With Student Lead",
      //       "url": "/tds/counsellor-dashboard/call-with-student-lead",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 46,
      //       "title": "Counselling With Student",
      //       "url": "/tds/counsellor-dashboard/counselling-with-student",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 47,
      //   "title": "Counselors Planning",
      //   "url": "/tds/counselors-planning",
      //   "type": "no",
      //   "hasChildren": true,
      //   "children": [
      //     {
      //       "id": 48,
      //       "title": "Trainers Planning",
      //       "url": "/tds/counselors-planning/trainers-planning",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     },
      //     {
      //       "id": 49,
      //       "title": "Batches Planning",
      //       "url": "/tds/counselors-planning/batches-planning",
      //       "type": "no",
      //       "hasChildren": false,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "id": 50,
      //   "title": "Practical Problem Exams",
      //   "url": "/tds/practical-problem-exams",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": []
      // },
      // {
      //   "id": 52,
      //   "title": "My Practical Exam",
      //   "url": "/tds/my-practical-exam",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": []
      // },
      // {
      //   "id": 55,
      //   "title": "Add Practical Problems Subform",
      //   "url": "/tds/add-practical-problem-solution",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": []
      // },
      // {
      //   "id": 56,
      //   "title": "Business Leads",
      //   "url": "/tds/business-lead",
      //   "type": "no",
      //   "hasChildren": false,
      //   "children": []
      // }
    ]
    // this._coreMenuService.onMenuRegistered.subscribe(res => {
    //    this.Menu = res[1];
    // })
    // this.CheckAadharPanStatus();
    // let data = ConfigurationSettings.getMenu();
    // this.Menu = data

    // this.poiLayoutService.currentLayoutDetails.subscribe(res => {
    //   this.layoutDetails = res;
    // })

    // this.poiLayoutService.panAadhaarLinkStatus.subscribe(res => {
    //   this.panAadhaarLink = res;
    // })



    // document.addEventListener("DOMContentLoaded", function (event) {

    //   const showNavbar = (toggleId, navId, bodyId, headerId) => {
    //     const toggle = document.getElementById(toggleId),
    //       nav = document.getElementById(navId),
    //       bodypd = document.getElementById(bodyId),
    //       headerpd = document.getElementById(headerId)

    //     // Validate that all variables exist
    //     if (toggle && nav && bodypd && headerpd) {
    //       toggle.addEventListener('click', () => {
    //         // show navbar
    //         nav.classList.toggle('show')
    //         // change icon
    //         toggle.classList.toggle('bx-x')
    //         // add padding to body
    //         bodypd.classList.toggle('body-pd')
    //         // add padding to header
    //         headerpd.classList.toggle('body-pd')
    //       })
    //     }
    //   }



    //   showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

    //   /*===== LINK ACTIVE =====*/
    //   const linkColor = document.querySelectorAll('.nav_link')

    //   function colorLink() {
    //     if (linkColor) {
    //       linkColor.forEach(l => l.classList.remove('active'))
    //       this.classList.add('active')
    //     }
    //   }
    //   linkColor.forEach(l => l.addEventListener('click', colorLink))

    //   // Your code to run since DOM is loaded and ready
    // });
  }
  activeMenuId: number | null = null; // Tracks the currently active menu

  toggleMenu(menuId: number): void {
    this.activeMenuId = this.activeMenuId === menuId ? null : menuId;
  }


  ngOnInit() {
    // this.CycleTypeId = ConfigurationSettings.getInvestmentCycleTypeId();
    // this.GetAllContent()
    // this.UserRole = ConfigurationSettings.getUserRole();
    // this.EmpId = ConfigurationSettings.getUserName();
    // this.UserName = ConfigurationSettings.getFullName();
    // this.employeeTypeDetailsId = ConfigurationSettings.getEmployeeTypeDetailsId();

    // this.UserRoleID = ConfigurationSettings.getUserRoleId();
    // this.GetUserListForMessage();
    // if (this.UserRoleID == undefined) {
    //   this.router.navigateByUrl('/test/login')
    // }
    // this.getUserNotificationList();


  }
  sendButtonDisabled(e: any) {
    e = e.trim()
    if (e !== '') {
      this.MessageSendButton = true;
    } else {
      this.MessageSendButton = false;
    }

  }
  hideShowLeftContent() {
    this.hideLeftContent = !this.hideLeftContent
  }

  showAllMessages() {
    this.GetUserListForMessage();
    this.getUserNotificationList();
    this.readChatMessage = false
    this.adminListView = false
    document.getElementById('messagePopup').click()
  }

  onNotificationClick() {
    this.readMessage = false
  }

  getUserNotificationList() {
    this.communicationService
      .getUserCommunicationDetails(false, CommunicationType.InAppNotification)
      .subscribe(
        (result: any) => {
          this.notificationData = result.Value;
          this.isNotificationPresent = false;
          this.notificationData.forEach(element => {
            if (!element.isRead) {
              this.isNotificationPresent = true;
              return false;
            }
          });
          // if (
          //   this.notificationData == null ||
          //   this.notificationData.length == 0
          // ) {
          //   this.notificationData = [];
          //   this.notificationData[0] = { body: "No Notification" };
          //   this.isNotificationPresent = false;
          // } else {
          //   this.isNotificationPresent = true;
          // }
        },
        (error: any) => { }
      );
  }

  onClickSubMenu() {
    let data = document.getElementsByClassName('modal-backdrop')[0].addEventListener('click', function (e) {

    })



    document.getElementById('CloseOnSubMenuClick').click();

    // document.getElementById(this.closeid).click()
    // this.closeMenu = false
    // this.isSecondClick=true
  }

  onClickSingalMenu() {
    localStorage.removeItem('ViewComputationMode')
    document.getElementById('CloseOnSubMenuClick').click();
    // document.getElementById(this.closeid).click()

    this.closeMenu = false
    this.isSecondClick = true
    document.getElementById(this.closeid).click()
  }



  onClickMenu(e: any) {

    let id = '0' + e

    let data = document.getElementById(id).getAttribute('aria-expanded')
    if ((data == 'false' && !this.closeMenu && this.isSecondClick) || this.closeid == '') {
      this.closeid = id
      this.closeMenu = true

    } else if (data == 'false') {
      this.test2 = '0' + e
      this.isSecondClick = false
      document.getElementById(this.closeid).click()

    } else if (!this.isSecondClick) {
      if (this.closeid == this.test2) {
        this.closeid = ''
      } else {
        this.closeid = this.test2
      }
      this.closeMenu = false
      this.isSecondClick = false

    }
    //  if(this.closeMenu){

    //  }
  }


  status: boolean = false;
  //Sidebar opne
  clickEvent() {
    this.status = true;
  }
  //Sidebar close
  clickEvent2() {
    this.status = false;
  }

  // onClick() {

  //   this.isSidebar = !this.isSidebar;
  // }

  onRoleChange() {
    let currentUserValue = this._userProfileService.CurrentUserValue;
    currentUserValue.CurrentRoleId = 1;
    // this.RollName = currentUserValue.Roles[this.RoleId].Name;
    this.SetRoleMenu(currentUserValue.roles.filter(f => f.roleId == 1)[0]);

    this._userProfileService.SetUserData(currentUserValue);
  }
  SetRoleMenu(roleDetails: RoleDetails) {
    // Set the main menu as our current menu
    //this.RollName = roleDetails.name;
    this._coreMenuService.setCurrentMenu(roleDetails.name);

  }

  Logout() {

    // this._authService.setSession(data);
    let data = localStorage.getItem('CompanyName')
    localStorage.clear();
    this.currentUser = null;
    window.location.href = environment.WebsiteURL + 'login';

  }

  GetAllContent() {
    let companyFinancialId = ConfigurationSettings.getCompanyFinancialId();
    let isFrom = 'poi-layout';
    try {
      this.poiLayoutService.GetAllContent(companyFinancialId, isFrom).subscribe(
        (result: any) => {
          let data = result
          this.poiLayoutService.setAllContentData(data);
        },
        (error: any) => {
          if (error && error.error) {
            this.alertService.ShowErrorMessage(error.error);
          }
        }
      );
    } catch (e) {
      console.log(e);
      this.alertService.ShowErrorMessage("Fail to load House Property data ");
    }
  }

  onClickReadMessage(selectedMsgData: any) {
    if (selectedMsgData.subject) {
      this.modalTitle = selectedMsgData.subject;
    }
    else {
      this.modalTitle = selectedMsgData.body;
    }
    this.messageBy = selectedMsgData.notificationFrom;
    this.messageByDate = selectedMsgData.createdDate;

    this.modalDetailedInfo = selectedMsgData.body;
    this.readMessage = true;

    this.updateNotificationStatus(selectedMsgData);
  }

  updateNotificationStatus(selectedMsgData: any) {
    let userCommunicationMappingViewModel: UserCommunicationMappingModel =
      new UserCommunicationMappingModel();
    userCommunicationMappingViewModel.communicationId = selectedMsgData.communicationId;
    userCommunicationMappingViewModel.userCommunicationId =
      selectedMsgData.userCommunicationId;
    userCommunicationMappingViewModel.updatedBy =
      ConfigurationSettings.getUserFinancialId();
    userCommunicationMappingViewModel.updatedDate = new Date();
    userCommunicationMappingViewModel.isRead = true;

    this.communicationService
      .updateUserCommunicationDetails(userCommunicationMappingViewModel)
      .subscribe(
        (result: any) => {
          this.getUserNotificationList();
        },
        (error: any) => { }
      );
  }

  onClickBackToNotification() {
    this.readMessage = false
  }


  //send message

  GetUserListForMessage() {

    return this.poiLayoutService.GetUserListForMessage().subscribe(
      result => {
        this.totalMessageCount = 0
        this.ToUserListOfMessage = result.Value;
        this.ToUserListOfMessage.forEach(element => {
          this.totalMessageCount += element.messageCount;
        });
      },
      (error: any) => {
        //this.alertService.ShowErrorMessage(error.error);
      }
    )
  }



  onClickPlusBtn() {
    this.gotoHomeList = true
    this.adminListView = true
    // this.adminMessage = false
    this.GetAllAdvisorList()
  }
  GetAllAdvisorList() {
    return this.poiLayoutService.GetAllAdvisorList().subscribe(
      result => {
        this.ToAllExpertAssistantsAdminList = result.Value;
      },
      (error: any) => {
        //this.alertService.ShowErrorMessage(error.error);
      }
    )
  }
  onClickUserForMessage(toUserList, i) {
    this.selectedUser = toUserList
    this.messageSendModel.toUserFinancialId = toUserList.fromUserFinancialId;
    this.messageSendModel.toCompanyFinancialId = toUserList.fromCompanyFinancialId;
    this.messageSendModel.chat = '';
    this.readChatMessage = true;
    this.adminListView = false;
    // if (toUserList.messageCount > 0) {
    //   this.messageSendModel.isCount = true
    // }
    // else {
    //   this.messageSendModel.isCount = false
    // }
    if (i == 1) {
      this.gotoHomeList = true
    } else {
      this.gotoHomeList = false
    }

    // this.adminMessage = true
    this.GetAllMessage()

  }
  onClickBackToMessageHome(gotohome) {
    if (gotohome) {
      this.readChatMessage = false
      this.adminListView = false
    } else {
      this.adminListView = true
      this.readChatMessage = false
      this.gotoHomeList = true
    }
    this.GetUserListForMessage();
  }

  onSendMessageClick() {
    this.messageSendModel.fromUserFinancialId = ConfigurationSettings.getUserFinancialId()
    this.messageSendModel.fromCompanyFinancialId = ConfigurationSettings.getCompanyFinancialId()
    this.messageSendModel.isRead = false;
    this.messageSendModel.isCount = true;
    this.messageSendModel.roleId = ConfigurationSettings.getUserRoleId()
    this.messageSendModel.chat = this.messageSendModel.chat.trim()
    if (this.messageSendModel.chat != '') {
      return this.poiLayoutService.onSendMessageClick(this.messageSendModel).subscribe(
        result => {
          let serviceResponse = result.Value;
          if (serviceResponse == ResponseCode.Success) {
            this.GetAllMessage()
            this.messageSendModel.chat = ''
            this.alertService.ShowSuccessMessage('Message Sent');

            this.GetUserListForMessage()
          }
          else {
            this.alertService.ShowErrorMessage(this.messageService.serviceError);

          }
        }
      )

    } else {
      this.alertService.ShowErrorMessage('Please Enter a message')
    }
  }

  GetAllMessage() {
    let toUserFinancialId = this.messageSendModel.toUserFinancialId
    let toCompanyFinancialId = this.messageSendModel.toCompanyFinancialId
    let fromUserFinancialId = ConfigurationSettings.getUserFinancialId()
    let fromCompanyFinancialId = ConfigurationSettings.getCompanyFinancialId()
    let roleId = ConfigurationSettings.getUserRoleId();
    this.poiLayoutService.GetAllMessage(toCompanyFinancialId, toUserFinancialId, fromUserFinancialId, fromCompanyFinancialId, roleId).subscribe(result => {
      this.MessageList = result.Value

    })
  }

  onSearchInputChange1() {
    const searchTextLowerCase = this.searchText1.toUpperCase();
    this.filteredUserList = this.ToUserListOfMessage.filter(user =>
      user.userName.toString().toUpperCase().includes(searchTextLowerCase) ||
      user.name.toUpperCase().includes(searchTextLowerCase)
    );
  }

  onSearchInputAdminChange2() {
    const searchTextLowerCase = this.searchText2.toUpperCase();
    this.filteredUserList2 = this.ToAllExpertAssistantsAdminList.filter(user =>
      user.userName.toString().toUpperCase().includes(searchTextLowerCase) ||
      user.name.toUpperCase().includes(searchTextLowerCase)
    );

  }

  CheckAadharPanStatus() {
    // this.pANAadharLinkVerificationService.getAadharPanLinkResponse().subscribe(
    //   (result: any) => {
    //     this.isPanAadharVerificationRequired = Number(ConfigurationSettings.getIsPanAadharVerificationRequired());
    //     let response = result.Value;
    //     let string
    //     if (response.message == null) {
    //       string = ''
    //     } else {
    //       string = response.message;
    //     }

    //     const substring1 = "is already linked to given Aadhaar";
    //     const substring2 = "is linked to Aadhaar number";
    //     if (string.includes(substring1)) {
    //       this.IsVerify = true;
    //     } else if (string.includes(substring2)) {
    //       this.IsVerify = true;
    //     } else {
    //       this.IsVerify = false;
    //     }
    //     this.poiLayoutService.setpanAadhaarLinkStatus(true);

    //     if(!this.IsVerify && this.isPanAadharVerificationRequired == 1 && this.UserRoleID == 3){
    //       this.isDisabledForVerifyPending = true;
    //     }else{ 
    //       this.isDisabledForVerifyPending = false;
    //     }



    //   },
    //   (error: any) => {

    //   }
    // );
  }



}

