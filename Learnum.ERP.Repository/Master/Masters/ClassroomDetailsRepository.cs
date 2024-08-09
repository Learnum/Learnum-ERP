using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;

namespace Learnum.ERP.Repository.Master
{

    public interface IClassroomDetailsRepository
    {
        Task<ResponseCode> InsertClassroomDetails(ClassroomDetailsModel classroomDetailsModel);
        Task<List<ClassroomDetailsResponseModel>> GetClassroomDetailsList();
        Task<Tuple<ClassroomDetailsModel?, ResponseCode>> GetClassroomDetails(long? ClassroomId);
    }

    public class ClassroomDetailsRepository : BaseRepository, IClassroomDetailsRepository
    {
        public async Task<ResponseCode> InsertClassroomDetails(ClassroomDetailsModel classroomDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(classroomDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertClassroomDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<ClassroomDetailsResponseModel>> GetClassroomDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<ClassroomDetailsResponseModel>("PROC_GetClassroomDetails", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<ClassroomDetailsModel?, ResponseCode>> GetClassroomDetails(long? ClassroomId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@ClassroomId", ClassroomId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<ClassroomDetailsModel?>("PROC_GetClassroomDetailsList", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<ClassroomDetailsModel?, ResponseCode>(result, responseCode));
            }
        }
    }
}
