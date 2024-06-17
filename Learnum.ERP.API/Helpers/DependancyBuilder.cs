using Microsoft.Extensions.DependencyInjection;
/*using TaxBlock.Core.Repository.Authentication;
using TaxBlock.Core.Repository.Masters;
using TaxBlock.Communication.Contracts.Publisher;
using static TaxBlock.Core.Repository.Masters.ICareerRepository;
using static TaxBlock.Core.Repository.Masters.IEmployeeDesignationMappingRepository;
using static TaxBlock.Core.Repository.Masters.IEmployeeMasterRepository;
using static TaxBlock.Core.Repository.Masters.IEmployeeTargetMappingRepository;
using static TaxBlock.Core.Repository.Masters.ISkillHubRepository;*/


namespace Learnum.ERP.API.Helpers
{
    public static class DependancyBuilder
    {
        public static void AddServices(this IServiceCollection services)
        {

        }

        public static void AddRepositories(this IServiceCollection services)
        {
            /*services.AddTransient<IAccountRepository, AccountRepository>();
            services.AddTransient<IUserCredentialsRepository, UserCredentialsRepository>();
            services.AddTransient<IOrganizationRepository, OrganizationRepository>();
            services.AddTransient<IClientDetailsRepository, ClientDetailsRepository>();
            services.AddTransient<IEmployeeMasterRepository, EmployeeMasterRepository>();
            services.AddTransient<IEmployeeDesignationMappingRepository, EmployeeDesignationMappingRepository>();
            services.AddTransient<IEmployeeTargetMappingRepository, EmployeeTargetMappingRepository>();

            services.AddTransient<ICareerRepository, CareerRepository>();
            services.AddTransient<IRegistrationRepository, RegistrationRepository>();
            services.AddTransient<IPubisherService, PubisherService>();
            services.AddTransient<ILoadClientDetailsRepository, LoadClientDetailsRepository>();
            services.AddTransient<ISkillHubRepository, SkillHubRepository>();*/


        }
    }
}
