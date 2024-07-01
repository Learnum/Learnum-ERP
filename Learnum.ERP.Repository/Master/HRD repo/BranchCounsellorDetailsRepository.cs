using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Learnum.ERP.Repository.Core;
using System.Data;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;

namespace Learnum.ERP.Repository.Master.HRD_repo
{
    public interface IBranchCounsellorDetailsRepository
    {
        Task<ResponseCode> InsertBranchCounsellorDetails(BranchCounsellorDetailsModel branchcounsellorDetailsModel);
        Task<List<BranchCounsellorDetailsResponseModel>> GetBranchCounsellorDetailsList();
    }
    public class BranchCounsellorDetailsRepository : BaseRepository, IBranchCounsellorDetailsRepository
    {
        public async Task<ResponseCode> InsertBranchCounsellorDetails(BranchCounsellorDetailsModel BranchCounsellorDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(BranchCounsellorDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BranchCounsellorDetailsResponseModel>> GetBranchCounsellorDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<BranchCounsellorDetailsResponseModel>("PROC_GetBranchCounsellorDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
