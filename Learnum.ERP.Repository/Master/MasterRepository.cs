using Dapper;
using Learnum.ERP.Repository.Core;
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
    }
}
