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
        Task<ResponseCode> InsertTopicDetails(SyllabusListModel syllabusListModel);

    }
   
    public class SyllabusDetailsRepository : BaseRepository, ISyllabusDetailsRepository
    {   
        public async Task<ResponseCode> InsertTopicDetails(SyllabusListModel syllabusListModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(syllabusListModel.syllabusDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbparams.Add("@Action", "InsertOrUpdateSyllabus");

                DataTable TopicDetailsDetail = new ListConverter().ToDataTable<TopicInformationModel>(syllabusListModel.topicInformationModel);
                TopicDetailsDetail.SetTypeName("TopicDetailsType");
                dbparams.Add("@TopicDetailsType", TopicDetailsDetail.AsTableValuedParameter("TopicDetailsType"));

                dbConnection.Query<int>("PROC_SyllabusDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }
    }
}
