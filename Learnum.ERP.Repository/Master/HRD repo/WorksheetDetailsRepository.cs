﻿using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Repository.Core;
using Dapper;
using System.Data;

namespace Learnum.ERP.Repository.Master.HRD_repo
{
    public interface IWorksheetDetailsRepository
    {
        Task<ResponseCode>InsertWorksheetDetails(WorksheetDetailsModel worksheetDetailsModel);
        Task<List<WorksheetDetailsResponseModel>> GetWorksheetDetailsList();

        Task<Tuple<WorksheetDetailsModel?, ResponseCode>> GetWorkSheetDetails(long? WorkId);

    }
    public class WorksheetDetailsRepository : BaseRepository, IWorksheetDetailsRepository
    {
        

        public async Task<List<WorksheetDetailsResponseModel>> GetWorksheetDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<WorksheetDetailsResponseModel>("PROC_GetDailyWorkSheetList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<ResponseCode> InsertWorksheetDetails(WorksheetDetailsModel worksheetDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(worksheetDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertDailyWorkSheet", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<WorksheetDetailsModel?, ResponseCode>> GetWorkSheetDetails(long? WorkId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@WorkId", WorkId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<WorksheetDetailsModel?>("PROC_DailyWorkDetailsList", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<WorksheetDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
