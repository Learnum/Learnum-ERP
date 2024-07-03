using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.CounselorsPlaning;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master.CounselorsPlaning
{

    public interface IAddBatchDetailsRepository
    {
        Task<ResponseCode>InsertAddBatchDetails(AddBatchDetailsModel addBatchDetailsModel);
        Task<List<AddBatchDetailsResponseModel>> GetAddBatchDetailsList();
    }
    public class AddBatchDetailsRepository : BaseRepository, IAddBatchDetailsRepository
    {
        public async Task<ResponseCode> InsertAddBatchDetails(AddBatchDetailsModel addBatchDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(addBatchDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }
        public async Task<List<AddBatchDetailsResponseModel>> GetAddBatchDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<AddBatchDetailsResponseModel>("", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
