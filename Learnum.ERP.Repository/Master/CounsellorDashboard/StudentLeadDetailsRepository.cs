using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboardModel;

namespace Learnum.ERP.Repository.Master.Counsellor_Dashboard_repo
{
    public interface IStudentLeadDetailsRepository
    {
        Task<ResponseCode> InsertStudentLeadDetails(StudentLeadDetailsModel studentleadDetailsModel);
        Task<List<StudentLeadDetailsResponseModel>> GetStudentLeadDetailsList();
        Task<Tuple<StudentLeadDetailsModel?, ResponseCode>> GetStudentDetails(long? StudentId);
    }
    public class StudentLeadDetailsRepository : BaseRepository, IStudentLeadDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentLeadDetails(StudentLeadDetailsModel studentleadDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(studentleadDetailsModel);
                dbparams.Add("@Action", "InsertStudentLeadsDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_StudentLeads", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<StudentLeadDetailsResponseModel>> GetStudentLeadDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetStudentLeadsDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<StudentLeadDetailsResponseModel>("PROC_StudentLeads", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
        public async Task<Tuple<StudentLeadDetailsModel?, ResponseCode>> GetStudentDetails(long? StudentId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@StudentId", StudentId);
                dbparams.Add("@Action", "GetStudentLeadsDetailsByStudentId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<StudentLeadDetailsModel?>("PROC_StudentLeads", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<StudentLeadDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}

