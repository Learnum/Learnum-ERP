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
using Learnum.ERP.Shared.Entities.Models.ViewModel;

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    public interface ISyllabusDetailsRepository
    {
        //Task<ResponseCode> InsertSyllabusDetails(TopicDetailsModel topicDetailsModel);
        Task<List<SyllabusDetailsResponseModel>> getSyllabusDetails();
        Task<ResponseCode> InsertSyllabusDetails(TopicInformationModel fileUpload);

        Task<Tuple<SyllabusTopicDetailsModel?, ResponseCode>> GetSyllabusDetailsById(long? SyllabusId);
        
    }
    public class SyllabusDetailsRepository : BaseRepository, ISyllabusDetailsRepository
    {
        public async Task<ResponseCode> InsertSyllabusDetails(TopicInformationModel fileUpload)
        {
            try
            {

                using (IDbConnection dbConnection = base.GetCoreConnection())
                {



                    var dbparams = new DynamicParameters(fileUpload);
                    dbparams.Add("@Action", "SaveServiceRequestDocs");
                    dbparams.Add("@Action", "InsertOrUpdateSyllabus");
                    dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                    dbConnection.Query("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
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

            public async Task<List<SyllabusDetailsResponseModel>> getSyllabusDetails()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetSyllabusDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);

                var result = dbConnection.Query<SyllabusDetailsResponseModel>("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }

        }

        public async Task<Tuple<SyllabusTopicDetailsModel?, ResponseCode>> GetSyllabusDetailsById(long? SyllabusId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@SyllabusId", SyllabusId);
                dbparams.Add("@Action", "GetSyllabusDetailsById");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.QueryMultiple("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                var response = new SyllabusTopicDetailsModel();
                response.syllabusDetailsModel = result.Read<SyllabusDetailsModel>().FirstOrDefault();
                response.topicInformationModel = result.Read<TopicInformationModel>().ToList();
                return await Task.FromResult(new Tuple<SyllabusTopicDetailsModel?, ResponseCode>(response, responseCode));
            }
        }
    }
}





