using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using System.Linq;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Repository.Master;
using System.Data;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;

namespace Learnum.ERP.Repository.Master.HRD_repo
{
    public interface IBranchAccountantDetailsRepository
    {
        Task<ResponseCode> InsertBranchAccountantDetails(BranchAccountantDetailsModel branchaccountDetailsModel);
        Task<List<BranchAccountantDetailsResponseModel>> GetBranchAccountantDetailsList();

    }
    public class BranchAccountantDetailsRepository : BaseRepository, IBranchAccountantDetailsRepository
    {
        public async Task<ResponseCode> InsertBranchAccountantDetails(BranchAccountantDetailsModel branchaccountantDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(branchaccountantDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertBranchAccountant", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BranchAccountantDetailsResponseModel>> GetBranchAccountantDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<BranchAccountantDetailsResponseModel>("PROC_GetBranchAccountant", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
