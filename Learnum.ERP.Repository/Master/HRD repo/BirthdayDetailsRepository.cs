using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Master.HRD_repo
{
    public interface IBirthdayDetailsRepository
    {
        Task<ResponseCode> InsertBirthdayDetails(BirthdayDetailsModel birthdayDetailsModel);
        Task<List<BirthdayDetailsResponseModel>> GetBirthdayDetailsList();

        Task<Tuple<BirthdayDetailsModel?, ResponseCode>> GetBirthdayDetails(long? BirthId);

    }

    public class BirthdayDetailsRepository : BaseRepository, IBirthdayDetailsRepository
    {
        public async Task<ResponseCode> InsertBirthdayDetails(BirthdayDetailsModel birthdayDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(birthdayDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertBirthDayDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BirthdayDetailsResponseModel>> GetBirthdayDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<BirthdayDetailsResponseModel>("PROC_GetBirthdayDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<BirthdayDetailsModel?, ResponseCode>> GetBirthdayDetails(long? BirthId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@BirthId", BirthId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BirthdayDetailsModel?>("PROC_EditBirthdayDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<BirthdayDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
