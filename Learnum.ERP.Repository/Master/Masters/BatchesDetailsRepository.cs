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

namespace Learnum.ERP.Repository.Master
{

    public interface IBatchesDetailsRepository
    {
        Task<ResponseCode> InsertBatchesDetails(BatchesDetailsModel batchesDetailsModel);
        Task<List<BatchesDetailsResponseModel>> GetBatchesDetailsList();
    }
    public class BatchesDetailsRepository : BaseRepository, IBatchesDetailsRepository
    {

        public async Task<ResponseCode> InsertBatchesDetails(BatchesDetailsModel batchesDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(batchesDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
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

    }
}
