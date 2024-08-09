using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Trainers;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master.Trainers
{

    public interface ISyllabusStatusRepository
    {
        Task<ResponseCode> AddSyllabusStatuses(SyllabusStatusModel syllabusStatusModel);
        Task<List<SyllabusStatusResponseModel>> GetSyllabusStatusesList();
        Task<Tuple<SyllabusStatusModel?, ResponseCode>> GetSyllabusDetails(long? TrainerId);

    }
    public class SyllabusStatusesRepository : BaseRepository, ISyllabusStatusRepository
    {
        public async Task<ResponseCode> AddSyllabusStatuses(SyllabusStatusModel syllabusStatusModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(syllabusStatusModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertSyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<SyllabusStatusResponseModel>> GetSyllabusStatusesList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<SyllabusStatusResponseModel>("PROC_GetSyllabusList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<SyllabusStatusModel?, ResponseCode>> GetSyllabusDetails(long? TrainerId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@TrainerId", TrainerId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<SyllabusStatusModel?>("PROC_GetSyllabusDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<SyllabusStatusModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
