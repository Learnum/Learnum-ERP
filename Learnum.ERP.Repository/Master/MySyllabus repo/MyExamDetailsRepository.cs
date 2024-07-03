using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Repository.Master.HRD_repo;
using System.Data;

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    //public interface IMyExamDetailsRepository
    //{
    //    Task<ResponseCode> InsertBirthdayDetails(BirthdayDetailsModel birthdayDetailsModel);
    //    Task<List<BirthdayDetailsResponseModel>> GetBirthdayDetailsList();
    //}
    //public class BirthdayDetailsRepository : BaseRepository, IBirthdayDetailsRepository
    //{
    //    public async Task<ResponseCode> InsertBirthdayDetails(BirthdayDetailsModel birthdayDetailsModel)
    //    {
    //        using (IDbConnection dbConnection = base.GetCoreConnection())
    //        {
    //            var dbparams = new DynamicParameters(birthdayDetailsModel);
    //            dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
    //            dbConnection.Query<int>("PROC_InsertBirthdayDetails", dbparams, commandType: CommandType.StoredProcedure);
    //            ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
    //            return await Task.FromResult(result);
    //        }
    //    }

    //    public async Task<List<BirthdayDetailsResponseModel>> GetBirthdayDetailsList()
    //    {
    //        using (IDbConnection dbConnection = base.GetCoreConnection())
    //        {
    //            var dbparams = new DynamicParameters();
    //            var result = dbConnection.Query<BirthdayDetailsResponseModel>("PROC_GetBirthdayDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
    //            return await Task.FromResult(result);
    //        }
    //    }
    //}
}
