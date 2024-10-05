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
using Learnum.ERP.Shared.Helpers;

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    public interface ISyllabusDetailsRepository
    {
        //Task<ResponseCode> InsertSyllabusDetails(TopicDetailsModel topicDetailsModel);
        Task<List<SyllabusDetailsResponseModel>> getSyllabusDetails();
        Task<ResponseCode> InsertSyllabusDetails(SyllabusListModel syllabusListModel);

        Task<Tuple<SyllabusListModel?, ResponseCode>> GetSyllabusDetailsById(long? SyllabusId);

    }
    /*   public class SyllabusDetailsRepository : BaseRepository, ISyllabusDetailsRepository
       {
           public async Task<ResponseCode> InsertSyllabusDetails(TopicInformationModelFileUpload fileUpload, SyllabusDetailsModel syllabusDetailsModel, SyllabusListModel syllabusTopicDetails)
           {
               try
               {
                   using (IDbConnection dbConnection = base.GetCoreConnection())
                   {
                       // Create dynamic parameters and map properties from fileUpload
                       var dbparams = new DynamicParameters(syllabusDetailsModel);
                       dbparams.Add("@SyllabusId", syllabusDetailsModel.SyllabusId, DbType.Int64);
                       dbparams.Add("@CourseId", syllabusDetailsModel.CourseId, DbType.Int64);
                       dbparams.Add("@SubjectId", syllabusDetailsModel.SubjectId, DbType.Int64);
                       dbparams.Add("@TopicName", syllabusDetailsModel.TopicName, DbType.String);
                       dbparams.Add("@IsActive", syllabusDetailsModel.IsActive, DbType.Boolean);


                       dbparams.Add("@Action", "InsertOrUpdateSyllabus");
                       dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);

                       DataTable TopicDetailsTable = new ListConverter().ToDataTable<TopicFormData>(syllabusTopicDetails.topicInformationModel);
                       TopicDetailsTable.SetTypeName("TopicDetailsType");
                       dbparams.Add("@TopicDetailsType", TopicDetailsTable.AsTableValuedParameter("TopicDetailsType"));



                       await dbConnection.QueryAsync("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
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

           public async Task<Tuple<SyllabusListModel?, ResponseCode>> GetSyllabusDetailsById(long? SyllabusId)
           {
               using (IDbConnection dbConnection = base.GetCoreConnection())
               {
                   var dbparams = new DynamicParameters();
                   dbparams.Add("@SyllabusId", SyllabusId);
                   dbparams.Add("@Action", "GetSyllabusDetailsById");
                   dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                   var result = dbConnection.QueryMultiple("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                   ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                   var response = new SyllabusListModel();
                   response.syllabusDetailsModel = result.Read<SyllabusDetailsModel>().FirstOrDefault();
                   response.topicInformationModel = result.Read<TopicInformationModel>().ToList();
                   return await Task.FromResult(new Tuple<SyllabusListModel?, ResponseCode>(response, responseCode));
               }
           }
       }
   }





   */

    public class SyllabusDetailsRepository : BaseRepository, ISyllabusDetailsRepository
    {
        public async Task<ResponseCode> InsertSyllabusDetails(SyllabusListModel syllabusListModel)
        {
            try
            {
                using (IDbConnection dbConnection = base.GetCoreConnection())
                {
                    var dbparams = new DynamicParameters(syllabusListModel);
                    /*dbparams.Add("@SyllabusId", syllabusListModel.SyllabusId, DbType.Int64);
                    dbparams.Add("@CourseId", syllabusListModel.CourseId, DbType.Int64);
                    dbparams.Add("@SubjectId", syllabusListModel.SubjectId, DbType.Int64);
                    dbparams.Add("@TopicName", syllabusListModel.TopicName, DbType.String);
                    dbparams.Add("@IsActive", syllabusListModel.IsActive, DbType.Boolean);*/
                    dbparams.Add("@Action", "InsertOrUpdateSyllabus");
                    dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);

                  //  DataTable topicDetailsTable = new ListConverter().ToDataTable<TopicInformationModel>(syllabusTopicDetails.topicInformationModel);
                  //topicDetailsTable.SetTypeName("TopicDetailsType");
                  //  dbparams.Add("@TopicDetailsType", topicDetailsTable.AsTableValuedParameter("TopicDetailsType"));

                    await dbConnection.QueryAsync("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                    ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");

                    return await Task.FromResult(result);
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"An error occurred: {ex.Message}");
                return ResponseCode.Failure;
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

        public async Task<Tuple<SyllabusListModel?, ResponseCode>> GetSyllabusDetailsById(long? SyllabusId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@SyllabusId", SyllabusId);
                dbparams.Add("@Action", "GetSyllabusDetailsById");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);

                var result = dbConnection.QueryMultiple("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                var response = new SyllabusListModel
                {
                    syllabusDetailsModel = result.Read<SyllabusDetailsModel>().FirstOrDefault(),
                    topicInformationModel = result.Read<TopicInformationModel>().ToList()
                };

                return await Task.FromResult(new Tuple<SyllabusListModel?, ResponseCode>(response, responseCode));
            }
        }
    }
}

public async Task<Tuple><SyllabusDetailsModel?, ResponseCode>> GetSyllabudDetailsById(long? Syllabus)
    {
      using (IDbConnection dbConnection = base.GetCoreConnection())
    {
        var dbparams = new DynamicParameters();
        dp
    }
}
    