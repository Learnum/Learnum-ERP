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

namespace Learnum.ERP.Repository.Master.Add_Practical_Problems_Subform
{
    public interface IPracticalProblemsSubformRepository
    {
        Task<ResponseCode> AddPracticalProblemDetails(PracticalProblemsSubform practicalProblemsSubform);
        Task<List<PracticalProblemsSubformResponseModel>> GetPracticalProblemList();
    }

    public class PracticalProblemsSubformRepository : BaseRepository, IPracticalProblemsSubformRepository
    {
        public async Task<ResponseCode> AddPracticalProblemDetails(PracticalProblemsSubform practicalProblemsSubform)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(practicalProblemsSubform);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<PracticalProblemsSubformResponseModel>> GetPracticalProblemList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<PracticalProblemsSubformResponseModel>("", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
