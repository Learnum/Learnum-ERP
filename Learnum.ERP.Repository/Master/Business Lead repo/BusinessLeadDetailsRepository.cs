﻿using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.BuisnessLeadModel;
using Learnum.ERP.Repository.Core;
using System.Data;
using Dapper;

namespace Learnum.ERP.Repository.Master.Business_Lead_repo
{
    
    public interface IBusinessLeadDetailsRepository
    {
        Task<ResponseCode> InsertBusinessLeadDetails(BuisnessLeadDetailsModel buisnessLeadDetailsModel);
        Task<List<BuisnessLeadDetailsResponseModel>> GetBuisnessDetailsList();
        Task<Tuple<BuisnessLeadDetailsModel?, ResponseCode>> GetBuisnessDetails(long? BusinessId);
    }

    public class BusinessLeadDetailsRepository : BaseRepository, IBusinessLeadDetailsRepository
    {
        public async Task<ResponseCode> InsertBusinessLeadDetails(BuisnessLeadDetailsModel buisnessLeadDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(buisnessLeadDetailsModel);
                dbparams.Add("@Action", "InsertBusinessLeadDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_BusinessLead", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BuisnessLeadDetailsResponseModel>> GetBuisnessDetailsList()
        {
             using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetBusinessLeadDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BuisnessLeadDetailsResponseModel>("PROC_BusinessLead", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }


        public async Task<Tuple<BuisnessLeadDetailsModel?, ResponseCode>> GetBuisnessDetails(long? BusinessId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetBusinessLeadDetailsByBusinessId");
                dbparams.Add("@BusinessId", BusinessId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BuisnessLeadDetailsModel?>("PROC_BusinessLead", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<BuisnessLeadDetailsModel?, ResponseCode>(result, responseCode));
            }
        }


    }
       
    
}