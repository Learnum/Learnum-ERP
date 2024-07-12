using System;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using Learnum.ERP.Repository.Core;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;


namespace Learnum.ERP.Repository.Master
{
    public interface IEmployeeDetailsRepository
    {
        Task<ResponseCode> InsertEmployeeDetails(EmployeeDetailsModel employeeDetailsModel);
        Task<List<EmployeeDetailsResponseModel>> GetEmployeeDetailsList();
    }
    public class EmployeeDetailsRepository : BaseRepository, IEmployeeDetailsRepository
    {
        public async Task<ResponseCode> InsertEmployeeDetails(EmployeeDetailsModel courseDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(courseDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertEmployeeDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<EmployeeDetailsResponseModel>> GetEmployeeDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<EmployeeDetailsResponseModel>("PROC_GetEmployeeDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
