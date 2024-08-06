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

namespace Learnum.ERP.Repository.Master.Student_Management
{


    public interface IStudentAdmissionsDetailsRepository
    {
        Task<ResponseCode> InsertStudentAdmissionsDetails(StudentAdmissionsDetailsModel studentAdmissionsDetailsModel);
       // Task<List<StudentAdmissionsDetailsResponseModel>> GetStudentAdmissionsDetailsList(); 
        Task<List<BranchDetailsModel>> GetBranchDetails();
        Task<List<CourseDetailsModel>> GetCourseDetails();
        Task<List<BatchesDetailsModel>> GetBatchDetails();
    }
    public class StudentAdmissionsDetailsRepository : BaseRepository, IStudentAdmissionsDetailsRepository
    {
        public async Task<ResponseCode> InsertStudentAdmissionsDetails(StudentAdmissionsDetailsModel studentAdmissionsDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(studentAdmissionsDetailsModel);
                dbparams.Add("@Action", "InsertSudentAdmission");
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
    }
}
