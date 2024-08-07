﻿using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Master
{

    public interface IBranchDetailsRepository
    {
        Task<ResponseCode>InsertBranchDetails(BranchDetailsModel branchDetailsModel);
        Task<List<BranchDetailsResponseModel>> GetBranchDetailsList();
        Task<Tuple<BranchDetailsModel?, ResponseCode>> GetBranchDetails(long? BranchId);

    }


    public class BranchDetailsRepository : BaseRepository, IBranchDetailsRepository
    {

        public async Task<ResponseCode>InsertBranchDetails(BranchDetailsModel branchDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(branchDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertBranchDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BranchDetailsResponseModel>> GetBranchDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetBranchDetailsList");
                var result = dbConnection.Query<BranchDetailsResponseModel>("PROC_GetBranchDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<BranchDetailsModel?, ResponseCode>> GetBranchDetails(long? BranchId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@BranchId", BranchId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BranchDetailsModel?>("PROC_GetBranchDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<BranchDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
