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


    public interface ILocationDetailsRepository
    {
        Task<ResponseCode> InsertLocationDetails(LocationDetailsModel locationDetailsModel);
        Task<List<LocationDetailsResponseModel>> GetLocationDetailsList();
    }

    public class LocationDetailsRepository : BaseRepository, ILocationDetailsRepository
    {

        public async Task<ResponseCode> InsertLocationDetails(LocationDetailsModel locationDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(locationDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertIPAddressDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<LocationDetailsResponseModel>> GetLocationDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<LocationDetailsResponseModel>("PROC_GetIPAddressDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
