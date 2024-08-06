using Learnum.ERP.Repository.Authentication;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.Add_Practical_Problems_Subform;
using Learnum.ERP.Repository.Master.Business_Lead_repo;
using Learnum.ERP.Repository.Master.Counsellor_Dashboard_repo;
using Learnum.ERP.Repository.Master.CounsellorDashboard;
using Learnum.ERP.Repository.Master.CounselorsPlaning;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.Masters;
using Learnum.ERP.Repository.Master.My_Practical_Exam;
using Learnum.ERP.Repository.Master.MySyllabus_repo;
using Learnum.ERP.Repository.Master.Practical_Exams;
using Learnum.ERP.Repository.Master.Student_Management;
using Learnum.ERP.Repository.Master.Trainers;


namespace Learnum.ERP.API.Helpers
{
    public static class DependancyBuilder
    {
        public static void AddServices(this IServiceCollection services)
        {

        }


        public static void AddRepositories(this IServiceCollection services)
        {
            
            //services.AddTransient<IUserCredentialsRepository, UserCredentialsRepository>();
           // services.AddTransient<IBulkEmailRepository, BulkEmailRepository>();
            //services.AddTransient<IClientDetailsRepository, ClientDetailsRepository>();
            //services.AddTransient<IUserProfileManagementRepository, UserProfileManagementRepository>();
            // services.AddTransient<ITransactionHistoryRepository, TransactionHistoryRepository>();
            //  services.AddTransient<IProductDashboardRepository, ProductDashboardRepository>();

            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IRegistrationRepository, RegistrationRepository>();
            services.AddTransient<IUserCredentialsRepository, UserCredentialsRepository>();
            services.AddTransient<IBranchDetailsRepository, BranchDetailsRepository>();
            services.AddTransient<ILocationDetailsRepository, LocationDetailsRepository>();
            services.AddTransient<IClassroomDetailsRepository, ClassroomDetailsRepository>();
            services.AddTransient<ICourseDetailsRepository, CourseDetailsRepository>();
            services.AddTransient<ISubjectDetailsRepository,SubjectDetailsRepository>();
            services.AddTransient<IBatchesDetailsRepository, BatchesDetailsRepository>();
            services.AddTransient<IAddBatchDetailsRepository, AddBatchDetailsRepository>();
            services.AddTransient<IBirthdayDetailsRepository, BirthdayDetailsRepository>();
            services.AddTransient<ITrainerDetailsRepository,TrainerDetailsRepository>();
            services.AddTransient<IAddCollegesRepository, AddCollegesRepository>(); 
            services.AddTransient<IScheduleMeetingDetailsRepository, ScheduleMeetingDetailsRepository>();  
            services.AddTransient<IScheduleSeminarDetailsRepository, ScheduleSeminarDetailsRepository>();
            services.AddTransient<IStudentLeadDetailsRepository, StudentLeadDetailsRepository>(); 
            services.AddTransient<IWebsiteLeadDetailsRepository, WebsiteLeadDetailsRepository>();
            services.AddTransient<IStudentLeadCallDetailsRepository, StudentLeadCallDetailsRepository>();
            services.AddTransient<IStudentCounsellingDetailsRepository, StudentCounsellingDetailsRepository>();
            services.AddTransient<IStudentDetailsRepository, StudentDetailsRepository>();
            services.AddTransient<IStudentLeadDetailsRepository, StudentLeadDetailsRepository>();   
            services.AddTransient<ITopicDetailsRepository, TopicDetailsRepository>();
            services.AddTransient<IEmployeeDetailsRepository, EmployeeDetailsRepository>();
            services.AddTransient<IWorksheetDetailsRepository, WorksheetDetailsRepository>();
            services.AddTransient<IBranchCounsellorDetailsRepository, BranchCounsellorDetailsRepository>();
           // services.AddTransient<IEmployeeDetailsRepository, EmployeeDetailsRepository>();
            services.AddTransient<IBranchManagerDetailsRepository,BranchManagerDetailsRepository>();
            services.AddTransient<IBusinessLeadDetailsRepository, BusinessLeadDetailsRepository>();
            services.AddTransient<IPracticalProblemsSubformRepository,PracticalProblemsSubformRepository>();
            services.AddTransient<IMyPracticalExamRepository, MyPracticalExamRepository>();
            services.AddTransient<ISyllabusStatusRepository, SyllabusStatusesRepository>();
            services.AddTransient<IBranchAccountantDetailsRepository, BranchAccountantDetailsRepository>();
            services.AddTransient<IContentWriterDetailsRepository, ContentWriterDetailsRepository>();
            services.AddTransient<IShedulePracticalExamRepository, ShedulePracticalExamRepository>();
            services.AddTransient<IMasterRepository, MasterRepository>();
            services.AddTransient<IOfflineFeesDetailsRepository, OfflineFeesDetailsRepository>();
            services.AddTransient<IStudentAdmissionsDetailsRepository,  StudentAdmissionsDetailsRepository>();
           
        }
    }
}
