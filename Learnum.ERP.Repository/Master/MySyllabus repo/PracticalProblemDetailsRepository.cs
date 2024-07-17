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
    public interface IPracticalProblemDetailsRepository
    {

        Task<ResponseCode> InsertPracticalProblemDetails(PracticalProblemModel practicalproblemDetailsModel);
        Task<List<PracticalproblemResponseModel>> GetPracticalProblemDetailsList();
       
    }
    public class PracticalProblemDetailsRepository : BaseRepository, IPracticalProblemDetailsRepository
    {
        public async Task<ResponseCode> InsertPracticalProblemDetails(PracticalProblemModel practicalproblemDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(practicalproblemDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertPracticalProblemDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<PracticalproblemResponseModel>> Get<PracticalproblemDetailsList>()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<PracticalproblemResponseModel>("PROC_GetPracticalProblemDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public Task<ResponseCode> PracticalProblemDetails(PracticalProblemModel practicalproblemDetailsModel)
        {
            throw new NotImplementedException();
        }

        public Task<List<PracticalproblemResponseModel>> GePracticalProblemDetailsList()
        {
            throw new NotImplementedException();
        }

        public Task<List<PracticalproblemResponseModel>> GetPracticalProblemDetailsList()
        {
            throw new NotImplementedException();
        }
    }
}
