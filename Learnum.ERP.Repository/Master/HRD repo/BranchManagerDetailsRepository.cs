using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;

namespace Learnum.ERP.Repository.Master.HRD_repo
{

    public interface IBranchManagerDetailsRepository
    {
        Task<ResponseCode> InsertBranchManagerDetails(BranchManagerDetailsModel branchmanagerDetailsModel);
        Task<List<BranchManagerDetailsResponseModel>> GetBranchManagerDetailsList();
    }
    public class BranchManagerDetailsRepository : BaseRepository, IBranchManagerDetailsRepository
    {
        public async Task<ResponseCode> InsertBranchManagerDetails(BranchManagerDetailsModel branchManagerDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(branchManagerDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertBranchManager", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BranchManagerDetailsResponseModel>> GetBranchManagerDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BranchManagerDetailsResponseModel>("PROC_GetBranchManagerDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}

