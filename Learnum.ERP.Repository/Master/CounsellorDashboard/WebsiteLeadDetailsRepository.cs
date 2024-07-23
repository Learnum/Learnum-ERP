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
    public interface IWebsiteLeadDetailsRepository
    {
        Task<ResponseCode> InsertWebsiteLeadDetails(WebsiteLeadDetailsModel websiteleadDetailsModel);
        Task<List<WebsiteLeadDetailsResponseModel>> GetWebsiteLeadDetailsList();
    }
    public class WebsiteLeadDetailsRepository : BaseRepository, IWebsiteLeadDetailsRepository
    {
        public async Task<ResponseCode> InsertWebsiteLeadDetails(WebsiteLeadDetailsModel websiteleadDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(websiteleadDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<WebsiteLeadDetailsResponseModel>> GetWebsiteLeadDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<WebsiteLeadDetailsResponseModel>("PROC_GetWebsiteLeadDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}

