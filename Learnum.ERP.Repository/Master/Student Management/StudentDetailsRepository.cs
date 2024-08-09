using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Repository.Core;
using Dapper;
using System.Data;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities;

namespace Learnum.ERP.Repository.Master.Student_Management
{


    public interface IStudentDetailsRepository
    {
        Task<ResponseCode> InsertStudentDetails(StudentDetailFileUpload fileUpload);
        Task<List<StudentDeatailsResponseModel>> GetStudentDetailsList();
        Task<Tuple<StudentDetailFileUpload?, ResponseCode>> GetStudentDetails(long? StudentId);
    }

    public class StudentDetailsRepository : BaseRepository, IStudentDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentDetails(StudentDetailFileUpload fileUpload)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(fileUpload);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertAddStudentDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<StudentDeatailsResponseModel>> GetStudentDetailsList() 
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<StudentDeatailsResponseModel>("PROC_GetAddStudentDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<StudentDetailFileUpload?, ResponseCode>> GetStudentDetails(long? StudentId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@StudentId", StudentId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<StudentDetailFileUpload?>("PROC_GetAddStudentDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<StudentDetailFileUpload?, ResponseCode>(result, responseCode));
            }
        }

    }
}
