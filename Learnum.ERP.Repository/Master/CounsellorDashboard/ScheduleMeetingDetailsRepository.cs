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
    public interface IScheduleMeetingDetailsRepository
    
     {
        Task<ResponseCode> InsertScheduleMeetingDetails(ScheduleMeetingDetailsModel schedulemeetingDetailsModel);
        Task<List<ScheduleMeetingDetailsResponseModel>> GetScheduleMeetingDetailsList();
        Task<Tuple<ScheduleMeetingDetailsModel?, ResponseCode>> GetMettingDetails(long? MeetingId);
    }
    public class ScheduleMeetingDetailsRepository : BaseRepository, IScheduleMeetingDetailsRepository
    {
        public async Task<ResponseCode> InsertScheduleMeetingDetails(ScheduleMeetingDetailsModel schedulemeetingDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(schedulemeetingDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertCollegeMeetingDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<ScheduleMeetingDetailsResponseModel>> GetScheduleMeetingDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<ScheduleMeetingDetailsResponseModel>("PROC_GetMeetingDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
        public async Task<Tuple<ScheduleMeetingDetailsModel?, ResponseCode>> GetMettingDetails(long? MeetingId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@MeetingId", MeetingId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<ScheduleMeetingDetailsModel?>("PROC_GetMettingDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<ScheduleMeetingDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}

