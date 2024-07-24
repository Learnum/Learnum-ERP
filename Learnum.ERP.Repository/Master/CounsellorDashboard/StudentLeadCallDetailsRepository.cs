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
    public interface IStudentLeadCallDetailsRepository
    {
        Task<ResponseCode> InsertStudentLeadDetails(StudentLeadCalldetailsModel studentLeadCalldetailsModel);
        Task<List<StudentLeadCallDetailsResponseModel>> GetStudentLeadDetailsList();
    }
    public class StudentLeadCallDetailsRepository : BaseRepository, IStudentLeadCallDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentLeadDetails(StudentLeadCalldetailsModel studentLeadCalldetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(studentLeadCalldetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertStudentCallDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<StudentLeadCallDetailsResponseModel>> GetStudentLeadDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<StudentLeadCallDetailsResponseModel>("PROC_GetStudentCallDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

    }
}

