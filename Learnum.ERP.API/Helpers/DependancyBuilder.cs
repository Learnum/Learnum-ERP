using Learnum.ERP.Repository.Authentication;
using Learnum.ERP.Repository.Master;
using Learnum.ERP.Repository.Master.HRD_repo;
using Learnum.ERP.Repository.Master.Masters;

namespace Learnum.ERP.API.Helpers
{
    public static class DependancyBuilder
    {
        public static void AddServices(this IServiceCollection services)
        {

        }


        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IRegistrationRepository, RegistrationRepository>();
            //services.AddTransient<IUserCredentialsRepository, UserCredentialsRepository>();
           // services.AddTransient<IBulkEmailRepository, BulkEmailRepository>();

            //services.AddTransient<IClientDetailsRepository, ClientDetailsRepository>();
            //services.AddTransient<IUserProfileManagementRepository, UserProfileManagementRepository>();
            services.AddTransient<IUserCredentialsRepository, UserCredentialsRepository>();
           // services.AddTransient<ITransactionHistoryRepository, TransactionHistoryRepository>();


          //  services.AddTransient<IProductDashboardRepository, ProductDashboardRepository>();


            services.AddTransient<IBranchDetailsRepository, BranchDetailsRepository>();
            services.AddTransient<ILocationDetailsRepository, LocationDetailsRepository>();
            services.AddTransient<IClassroomDetailsRepository, ClassroomDetailsRepository>();
            services.AddTransient<ICourseDetailsRepository, CourseDetailsRepository>();
            services.AddTransient<ISubjectDetailsRepository,SubjectDetailsRepository>();
            services.AddTransient<IBatchesDetailsRepository, BatchesDetailsRepository>();
            services.AddTransient<IBirthdayDetailsRepository, BirthdayDetailsRepository>();
            services.AddTransient<ITrainerDetailsRepository,TrainerDetailsRepository>();

            services.AddTransient<IEmployeeDetailsRepository, EmployeeDetailsRepository>();
            services.AddTransient<IBranchManagerDetailsRepository,BranchManagerDetailsRepository>();

        }
    }
}
