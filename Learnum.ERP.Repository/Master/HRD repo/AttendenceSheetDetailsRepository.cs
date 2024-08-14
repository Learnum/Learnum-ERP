using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Master.HRD_repo
{
    public interface IAttendenceSheetDetailsRepository
    {
        Task<ResponseCode> InsertAttendenceSheetDetails(AttendenceSheetDetailsModel attendenceSheetDetailsModel);
        Task<List<AttendenceSheetDetailsResponseModel>> GetAttendenceSheetDetailsList();

        Task<Tuple<AttendenceSheetDetailsModel?, ResponseCode>> GetAttendenceDetailsDetailsById(long? AttendenceID);

    }

    public class AttendenceSheetDetailsRepository : BaseRepository, IAttendenceSheetDetailsRepository
    {
        public async Task<ResponseCode> InsertAttendenceSheetDetails(AttendenceSheetDetailsModel attendenceSheetDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(attendenceSheetDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertAttendenceDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<AttendenceSheetDetailsResponseModel>> GetAttendenceSheetDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<AttendenceSheetDetailsResponseModel>("PROC_GetAttendenceDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<AttendenceSheetDetailsModel?, ResponseCode>> GetAttendenceDetailsDetailsById(long? AttendenceID)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@AttendenceID", AttendenceID);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<AttendenceSheetDetailsModel?>("PROC_GetAttendenceDetailsList", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<AttendenceSheetDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
