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
    }

    public class ClassroomDetailsRepository : BaseRepository, IClassroomDetailsRepository
    {
        public async Task<ResponseCode> InsertClassroomDetails(ClassroomDetailsModel classroomDetailsModel)
        {
            try
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
            catch (Exception ex)
            {
               
                throw new Exception("An error occurred while retrieving the classroom details list.", ex);
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
    }
}
