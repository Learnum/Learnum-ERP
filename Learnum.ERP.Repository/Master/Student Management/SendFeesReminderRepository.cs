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

namespace Learnum.ERP.Repository.Master.Student_Management
{
    public interface ISendFeesReminderRepository
    {
        Task<ResponseCode> InsertSendFeesReminder(SendFeesReminderModel sendFeesReminderModel);
        Task<List<SendFeesReminderResponseModel>> GetSendFeesReminderList();
        Task<Tuple<SendFeesReminderModel?, ResponseCode>> GetSendFeesReminderBySendFeesId(long? @SendFeesId);
    }
    public class SendFeesReminderRepository : BaseRepository, ISendFeesReminderRepository
    {
        public async Task<ResponseCode> InsertSendFeesReminder(SendFeesReminderModel sendFeesReminderModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(sendFeesReminderModel);
                dbparams.Add("@Action", "InsertSendFeesReminder");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_SendFeesReminderDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<SendFeesReminderResponseModel>> GetSendFeesReminderList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetSendFeesReminderList");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<SendFeesReminderResponseModel>("PROC_SendFeesReminderDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<SendFeesReminderModel?, ResponseCode>> GetSendFeesReminderBySendFeesId(long? @SendFeesId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@SendFeesId", @SendFeesId);
                dbparams.Add("@Action", "GetSendFeesReminderBySendFeesId");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<SendFeesReminderModel?>("PROC_SendFeesReminderDetails", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<SendFeesReminderModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
