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
    public interface IGeneralExamDetailsRepository
    {
        Task<ResponseCode> InsertGeneralExamDetails(GeneralExamDetailsModel generalexamDetailsModel);
        Task<List<GeneralExamDetailsResponseModel>> GetGeneralExamDetailsList();

        public class GeneralExamDetailsRepository : BaseRepository, IGeneralExamDetailsRepository
        {
            public async Task<ResponseCode> InsertGeneralExamDetails(GeneralExamDetailsModel generalexamDetailsModel)
            {
                using (IDbConnection dbConnection = base.GetCoreConnection())
                {
                    var dbparams = new DynamicParameters(generalexamDetailsModel);
                    dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                    dbConnection.Query<int>("PROC_InsertGeneralExamDetails", dbparams, commandType: CommandType.StoredProcedure);
                    ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                    return await Task.FromResult(result);
                }
            }

            public async Task<List<GeneralExamDetailsResponseModel>> GetGeneralExamDetailsList()
            {
                using (IDbConnection dbConnection = base.GetCoreConnection())
                {
                    var dbparams = new DynamicParameters();
                    var result = dbConnection.Query<GeneralExamDetailsResponseModel>("PROC_GetGeneralExamDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(result);
                }
            }
        }
    }
}

