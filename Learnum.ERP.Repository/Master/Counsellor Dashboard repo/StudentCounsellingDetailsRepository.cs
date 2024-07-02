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
    public interface IStudentCounsellingDetailsRepository
    {
        Task<ResponseCode> InsertStudentCounsellingDetails(StudentCounsellingDetailsModel studentcounsellingDetailsModel);
        Task<List<StudentCounsellingDetailsResponseModel>> GetStudentCounsellingDetailsList();
    }
    public class StudentCounsellingDetailsRepository : BaseRepository, IStudentCounsellingDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentCounsellingDetails(StudentCounsellingDetailsModel studentcounsellingDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(studentcounsellingDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<StudentCounsellingDetailsResponseModel>> GetStudentCounsellingDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<StudentCounsellingDetailsResponseModel>("PROC_GetStudentCounsellingDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}

