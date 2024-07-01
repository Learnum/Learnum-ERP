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
        Task<ResponseCode> SendFeesReminder(SendFeesReminderModel sendFeesReminderModel);
        Task<List<SendFeesReminderResponseModel>> GetSendFeesReminderList();
    }
    public class SendFeesReminderRepository : BaseRepository, ISendFeesReminderRepository
    {
        public async Task<ResponseCode> SendFeesReminder(SendFeesReminderModel sendFeesReminderModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(sendFeesReminderModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<SendFeesReminderResponseModel>> GetSendFeesReminderList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<SendFeesReminderResponseModel>("", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
