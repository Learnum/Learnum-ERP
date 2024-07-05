using Learnum.ERP.Shared.Core;
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
        Task<List<BuisnessLeadDetailsResponseModel>> GetBuisnessLeadDetailsList();
    }
    public class BusinessLeadDetailsRepository : BaseRepository, IBuisnessLeadDetailsRepository
    {
        public async Task<ResponseCode> InsertBusinessLeadDetails(BuisnessLeadDetailsModel buisnessLeadDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(buisnessLeadDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BuisnessLeadDetailsResponseModel>> GetBusinessLeadDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<BuisnessLeadDetailsResponseModel>("PROC_GetBuisnessLeadDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}