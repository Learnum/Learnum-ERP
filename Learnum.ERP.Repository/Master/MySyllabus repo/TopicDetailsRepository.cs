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

namespace Learnum.ERP.Repository.Master.MySyllabus_repo
{
    public interface ITopicDetailsRepository
    {
        Task<ResponseCode> InsertTopicDetails(TopicDetailsModel topicDetailsModel);
        Task<List<TopicDetailsResponseModel>> GetTopicDetailsList();
    }
    public class TopicDetailsRepository : BaseRepository, ITopicDetailsRepository
    {
        public async Task<ResponseCode> InsertTopicDetails(TopicDetailsModel topicDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(topicDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertTopicDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<TopicDetailsResponseModel>> GetTopicDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<TopicDetailsResponseModel>("PROC_GetTopicDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
