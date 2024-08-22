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
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;


namespace Learnum.ERP.Repository.Master
{
    public interface IEmployeeDetailsRepository
    {
        Task<ResponseCode> InsertEmployeeDetails(EmployeePhotoupload fileUpload);
        Task<List<EmployeeDetailsResponseModel>> GetEmployeeDetailsList();

        Task<Tuple<EmployeePhotoupload?, ResponseCode>> GetemployeeDetailsById(long? EmployeeId);

    }
    public class EmployeeDetailsRepository : BaseRepository, IEmployeeDetailsRepository
    {
        public async Task<ResponseCode> InsertEmployeeDetails(EmployeePhotoupload fileUpload)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(fileUpload);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertAddEmployeeDetails", dbparams, commandType: CommandType.StoredProcedure);
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

        public async Task<Tuple<EmployeePhotoupload?, ResponseCode>> GetemployeeDetailsById(long? EmployeeId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@EmployeeId", EmployeeId);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<EmployeePhotoupload?>("PROC_GetEmployeeDetailsList", dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                ResponseCode responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<EmployeePhotoupload?, ResponseCode>(result, responseCode));
            }
        }
    }
}
