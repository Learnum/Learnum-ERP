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
    public interface IScheduleSeminarDetailsRepository
    {
        
        Task<ResponseCode> InsertScheduleSeminarDetails(ScheduleSeminarDetailsModel scheduleseminarDetailsModel);
        Task<List<ScheduleSeminarDetailsResponseModel>> GetScheduleSeminarDetailsList();
    }
    public class ScheduleSeminarDetailsRepository : BaseRepository, IScheduleSeminarDetailsRepository
    {
        public async Task<ResponseCode> InserScheduleSeminarDetails(ScheduleSeminarDetailsModel scheduleseminarDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(scheduleseminarDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<ScheduleSeminarDetailsResponseModel>> GetScheduleSeminarDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<ScheduleSeminarDetailsResponseModel>("PROC_GetScheduleSeminarDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public Task<ResponseCode> InsertScheduleSeminarDetails(ScheduleSeminarDetailsModel scheduleseminarDetailsModel)
        {
            throw new NotImplementedException();
        }
    }
}

