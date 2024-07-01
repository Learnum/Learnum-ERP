using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master
{

    public interface ISubjectDetailsRepository
    {
        Task<ResponseCode> InsertSubjectDetails(SubjectDetailsModel subjectDetailsModel);
        Task<List<SubjectDetailsResponseModel>> GetSubjectDetailsList();
    }

    public class SubjectDetailsRepository : BaseRepository, ISubjectDetailsRepository
    {
        public async Task<ResponseCode> InsertSubjectDetails(SubjectDetailsModel subjectDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(subjectDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertSubjectDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<SubjectDetailsResponseModel>> GetSubjectDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<SubjectDetailsResponseModel>("PROC_GetSubjectDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }                       
        }

    }
}
