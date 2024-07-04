using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.CounselorsPlaning;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Trainers;

namespace Learnum.ERP.Repository.Master.CounselorsPlaning
{

    public interface ICounselorsPlaningRepository
    {
        Task<ResponseCode> InsertCounselorsPlaningDetails(CounselorsPlaningModel counselorsPlaningModel);
        Task<List<CounselorsPlaningResponseModel>> GetCounselorsPlaningList();
    }
    public class CounselorsPlaningRepository : BaseRepository, ICounselorsPlaningRepository
    {
        public async Task<ResponseCode> InsertCounselorsPlaningDetails(CounselorsPlaningModel counselorsPlaningModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(counselorsPlaningModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<CounselorsPlaningResponseModel>> GetCounselorsPlaningList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<CounselorsPlaningResponseModel>("", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
