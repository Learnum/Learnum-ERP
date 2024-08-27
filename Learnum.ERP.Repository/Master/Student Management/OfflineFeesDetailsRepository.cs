using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master.Student_Management
{

    public interface IOfflineFeesDetailsRepository
    {
        Task<ResponseCode> InsertOfflineFeesDetails(OfflineFeesDetailsModel offlineFeesDetailsModel);
        Task<List<OfflineFeesDetailsResponseModel>> GetOfflineFeesDetailsList();

        Task<Tuple<OfflineFeesDetailsModel?, ResponseCode>> GetOfflineFeesDetailsByID(long? @OfflineFeesPaymentId);

    }
    public class OfflineFeesDetailsRepository : BaseRepository, IOfflineFeesDetailsRepository
    {
        public async Task<ResponseCode> InsertOfflineFeesDetails(OfflineFeesDetailsModel offlineFeesDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(offlineFeesDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertUpdateOfflineFeesPayment", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<OfflineFeesDetailsResponseModel>> GetOfflineFeesDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<OfflineFeesDetailsResponseModel>("PROC_GetOfflineFeesPayment", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<OfflineFeesDetailsModel?, ResponseCode>> GetOfflineFeesDetailsByID(long? @OfflineFeesPaymentId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@OfflineFeesPaymentId", @OfflineFeesPaymentId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<OfflineFeesDetailsModel?>("PROC_OfflineFeesPaymentDetailList", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<OfflineFeesDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
