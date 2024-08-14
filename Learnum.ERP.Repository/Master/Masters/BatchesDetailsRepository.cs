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
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Helpers;

namespace Learnum.ERP.Repository.Master
{

    public interface IBatchesDetailsRepository
    {
      //  Task<ResponseCode> InsertBatchesDetails(BatchesDetailsModel batchesDetailsModel);
        Task<List<BatchesDetailsResponseModel>> GetBatchesDetailsList();
        Task<ResponseCode> InsertBatchesDetails(BatchDetailsPayload batchesDetailsReqModel);
        Task<Tuple<BatchDetailsPayload?, ResponseCode>> GetBatchDetails(long? BatchId);
    }
    public class BatchesDetailsRepository : BaseRepository, IBatchesDetailsRepository
    {

        public async Task<ResponseCode> InsertBatchesDetails(BatchDetailsPayload batchesDetailsReqModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(batchesDetailsReqModel.BatchDetails);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
 
                DataTable InstallmentDetailsTable = new ListConverter().ToDataTable<InstallMentModel>(batchesDetailsReqModel.InstallmentDetails);
                InstallmentDetailsTable.SetTypeName("InstallmentDetailsType");
                dbparams.Add("@InstallmentDetails", InstallmentDetailsTable.AsTableValuedParameter("InstallmentDetailsType"));

                dbConnection.Query<int>("PROC_InsertBatchesDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BatchesDetailsResponseModel>> GetBatchesDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<BatchesDetailsResponseModel>("PROC_GetBatchDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }


        public async Task<Tuple<BatchDetailsPayload?, ResponseCode>> GetBatchDetails(long? BatchId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@BatchId", BatchId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BatchDetailsPayload?>("PROC_GetBatchesDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<BatchDetailsPayload?, ResponseCode>(result, responseCode));
            }
        }
    }
}
