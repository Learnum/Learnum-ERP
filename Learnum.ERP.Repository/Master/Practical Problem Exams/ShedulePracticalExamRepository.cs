using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Practical_Exams;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master.Practical_Exams
{

    public interface IShedulePracticalExamRepository
    {
        Task<ResponseCode> ShedulePracticalExam(ShedulePracticalExamModel shedulePracticalExamModel);
        Task<List<ShedulePracticalExamResponseModel>> GetShedulePracticalExamList();
    }
    public class ShedulePracticalExamRepository :BaseRepository, IShedulePracticalExamRepository
    {
        public async Task<ResponseCode> ShedulePracticalExam(ShedulePracticalExamModel shedulePracticalExamModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(shedulePracticalExamModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<ShedulePracticalExamResponseModel>> GetShedulePracticalExamList()
        {
               using (IDbConnection dbConnection = base.GetCoreConnection())
                {
                    var dbparams = new DynamicParameters();
                    var result = dbConnection.Query<ShedulePracticalExamResponseModel>("", dbparams, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(result);
                }
        }
        
    }
}
