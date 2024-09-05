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
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Helpers;
using System.Data.Common;

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    public interface IMcqDetailsRepository
    {

        Task<ResponseCode> InsertMcqDetails(McqDetailsList mcqDetailsModel);
        Task<List<McqDetailsResponseModel>> GetMcqDetailsList();

        Task<Tuple<McqDetailsList?, ResponseCode>> GetMcqDetailsById(long? McqId);


    }
    public class McqDetailsRepository : BaseRepository, IMcqDetailsRepository
    {
        public async Task<ResponseCode> InsertMcqDetails(McqDetailsList mcqDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(mcqDetailsModel.mcqDetails);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbparams.Add("@Action", "InsertAddMcqDetails");


                DataTable McqDetailsTable = new ListConverter().ToDataTable<McqQuestionDetails>(mcqDetailsModel.mcqQuestionDetails);
                McqDetailsTable.SetTypeName("McqDetailstype");
                dbparams.Add("@McqDetailstype", McqDetailsTable.AsTableValuedParameter("McqDetailstype"));


                dbConnection.Query<int>("PROC_ADDMCQDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<McqDetailsResponseModel>> GetMcqDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetAddMcqDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<McqDetailsResponseModel>("PROC_ADDMCQDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<McqDetailsList?, ResponseCode>> GetMcqDetailsById(long? McqId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@McqId", McqId);
                dbparams.Add("@Action", "GetAddMcqDetailsByMcqId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.QueryMultiple("PROC_ADDMCQDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                var response = new McqDetailsList();
                response.mcqDetails = result.Read<McqDetails>().FirstOrDefault();
                response.mcqQuestionDetails = result.Read<McqQuestionDetails>().ToList();
                return await Task.FromResult(new Tuple<McqDetailsList?, ResponseCode>(response, responseCode));
            }
        }
    }
}

