using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.Comman;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Master
{

    public interface IMasterRepository
    {
        Task<List<JobRoleList>> GetAllJobrole();
        Task<List<CollegeRoleList>> GetAllColleges();
        Task<List<StateMaster>> GetAllStates();
        Task<List<CountryMaster>> GetAllCountries();
        Task<List<CityMaster>> LoadStateWiseCities(long stateId);


    }
    public class MasterRepository : BaseRepository,IMasterRepository
    {
        public async Task<List<JobRoleList>> GetAllJobrole()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetAllJobrole");
                var result = dbConnection.Query<JobRoleList>("PROC_GetSelectList", param, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
        public async Task<List<CollegeRoleList>> GetAllColleges()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetAllColleges");
                var result = dbConnection.Query<CollegeRoleList>("PROC_GetSelectList", param, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<List<StateMaster>> GetAllStates()
        {

            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetAllStates");
                var result = dbConnection.Query<StateMaster>("PROC_GetSelectList", param, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<List<CityMaster>> LoadStateWiseCities(long stateId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "getAllStateWiseCities");
                param.Add("@StateId", stateId);
                var result = dbConnection.Query<CityMaster>("PROC_GetSelectList", param, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<List<CountryMaster>> GetAllCountries()
        {

            using (IDbConnection dbConnection = base.GetTDSConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetAllCountries");
                var result = dbConnection.Query<CountryMaster>("PROC_GetSelectList", param, commandType: CommandType.StoredProcedure).ToList();
                ResponseCode responseCode = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(result);
            }

        }

    }
}
