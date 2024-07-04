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
using Learnum.ERP.Shared.Entities.Models.ViewModel.MySyllabusModel;

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    public interface IMcqDetailsRepository
    {

        Task<ResponseCode> InsertMcqyDetails(McqDetailsModel mcqDetailsModel);
        Task<List<McqDetailsResponseModel>> GetMcqDetailsList();
        Task<ResponseCode> InsertMcqDetails(McqDetailsModel mcqDetailsModel);
    }
    public class McqDetailsRepository : BaseRepository, IMcqDetailsRepository
    {
        public async Task<ResponseCode> InsertMcqDetails(McqDetailsModel mcqDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(mcqDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertMcqDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<McqDetailsResponseModel>> GetMcqDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<McqDetailsResponseModel>("PROC_GetMcqDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public Task<ResponseCode> InsertMcqyDetails(McqDetailsModel mcqDetailsModel)
        {
            throw new NotImplementedException();
        }
    }
}
