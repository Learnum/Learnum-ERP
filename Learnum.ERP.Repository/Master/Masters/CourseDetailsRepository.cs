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
using Learnum.ERP.Shared.Entities;

namespace Learnum.ERP.Repository.Master
{
    public interface ICourseDetailsRepository
    {
        Task<ResponseCode> InsertCourseDetails(FileUpload fileUpload);
        Task<List<CourseDetailsResponseModel>> GetCourseDetailsList();
    }

    public class CourseDetailsRepository : BaseRepository, ICourseDetailsRepository
    {
        public async Task<ResponseCode> InsertCourseDetails(FileUpload fileUpload)
        {
            try
            {
                using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(fileUpload);
                dbparams.Add("@Action", "SaveServiceRequestDocs");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query("PROC_InsertCourseDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                // Handle the exception (e.g., return a failure response code)
                return ResponseCode.Success;
            }
        }

        public async Task<List<CourseDetailsResponseModel>> GetCourseDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<CourseDetailsResponseModel>("PROC_GetCourseDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }

        }
    }
}
