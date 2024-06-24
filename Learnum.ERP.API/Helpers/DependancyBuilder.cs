using Learnum.ERP.Repository.Authentication;
using Learnum.ERP.Repository.Master;

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

        }
    }
}
