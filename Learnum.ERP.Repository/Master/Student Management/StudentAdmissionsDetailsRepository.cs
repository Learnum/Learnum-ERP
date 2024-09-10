using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.Student_Management;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities.Models.Comman;
using Learnum.ERP.Shared.Entities.Models.ViewModel;

namespace Learnum.ERP.Repository.Master.Student_Management
{


    public interface IStudentAdmissionsDetailsRepository
    {
        Task<ResponseCode> InsertStudentAdmissionsDetails(StudentAdmissionsDetailsModel studentAdmissionsDetailsModel);
        Task<List<StudentAdmissionsDetailsResponseModel>> GetStudentAdmissionsDetailsList();
        Task<Tuple<StudentAdmissionsDetailsModel?, ResponseCode>> GetStudentAdmissionsDetailsByAdmissionId(long? AdmissionId);
        Task<List<BranchDetailsModel>> GetBranchDetails();
        Task<List<CourseDetailsModel>> GetCourseDetails();
        Task<Tuple<List<BatchesDetailsModel>?, ResponseCode>> GetBatchDetailsbyBranchID(long? BranchId);
       
    }
    public class StudentAdmissionsDetailsRepository : BaseRepository, IStudentAdmissionsDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentAdmissionsDetails(StudentAdmissionsDetailsModel studentAdmissionsDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(studentAdmissionsDetailsModel);
                dbparams.Add("@Action", "InsertStudentAdmission");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_StudentAdmissions", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<BranchDetailsModel>> GetBranchDetails()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "getBranches");
                var result = dbConnection.Query<BranchDetailsModel>("PROC_GetBranchDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<List<CourseDetailsModel>> GetCourseDetails()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "getCourses");
                var result = dbConnection.Query<CourseDetailsModel>("PROC_GetCourseDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
       
        public async Task<Tuple<List<BatchesDetailsModel>?, ResponseCode>> GetBatchDetailsbyBranchID(long? BranchId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@BranchId", BranchId);
                dbparams.Add("@Action", "GetBatchDetailsByBranchId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<BatchesDetailsModel?>("PROC_StudentAdmissions", dbparams, commandType: CommandType.StoredProcedure).ToList();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<List<BatchesDetailsModel>?, ResponseCode>(result, responseCode));
            }
        }

        public async Task<List<StudentAdmissionsDetailsResponseModel>> GetStudentAdmissionsDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetStudentDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<StudentAdmissionsDetailsResponseModel>("PROC_StudentAdmissions", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<StudentAdmissionsDetailsModel?, ResponseCode>> GetStudentAdmissionsDetailsByAdmissionId(long? AdmissionId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@AdmissionId", AdmissionId);
                dbparams.Add("@Action", "GetStudentDetailsByAdmissionId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<StudentAdmissionsDetailsModel?>("PROC_StudentAdmissions", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<StudentAdmissionsDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
