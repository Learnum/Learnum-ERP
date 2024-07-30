using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Add_Practical_Problems_Subform;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities;

namespace Learnum.ERP.Repository.Master.Add_Practical_Problems_Subform
{
    public interface IPracticalProblemsSubformRepository
    {
        Task<ResponseCode> AddPracticalProblem(AddPracticalFileUpload addPracticalFileUpload);
        Task<List<PracticalProblemsSubformResponseModel>> GetPracticalProblemList();

        Task<Tuple<AddPracticalFileUpload?, ResponseCode>> GetPracticalDetails(long? QuestionId);
    }

    public class PracticalProblemsSubformRepository : BaseRepository, IPracticalProblemsSubformRepository
    {
        public async Task<ResponseCode> AddPracticalProblem(AddPracticalFileUpload addPracticalFileUpload)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(addPracticalFileUpload);
                dbparams.Add("@Action", "SaveServiceRequestDocs");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query("PROC_AddPracticalProblem", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<PracticalProblemsSubformResponseModel>> GetPracticalProblemList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<PracticalProblemsSubformResponseModel>("PROC_GetPracticalProblemList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<AddPracticalFileUpload?, ResponseCode>> GetPracticalDetails(long? QuestionId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@QuestionId", QuestionId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<AddPracticalFileUpload?>("PROC_AddPracticalDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<AddPracticalFileUpload?, ResponseCode>(result, responseCode));
            }
        }

    }
}
