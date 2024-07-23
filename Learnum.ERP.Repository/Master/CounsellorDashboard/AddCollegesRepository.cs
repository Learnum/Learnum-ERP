using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Entities.Models.ViewModel.CounsellorDashboard;
using Dapper;
using System.Data;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities;
using Learnum.ERP.Shared.Helpers;

namespace Learnum.ERP.Repository.Master.CounsellorDashboard
{

    public interface IAddCollegesRepository
    {
        Task<ResponseCode> InsertCollegesDetails(CollegeContactDetails collegeContactDetails);
        Task<List<AddCollegesResponseModel>> GetCollegesDetailsList();
    }
    public class AddCollegesRepository : BaseRepository, IAddCollegesRepository
    {
        /*public async Task<ResponseCode> InsertCollegesDetails(CollegeContactDetails collegeContactDetails)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(collegeContactDetails);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertCollegeDetails", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }
*/
        public async Task<ResponseCode> InsertCollegesDetails(CollegeContactDetails collegeContactDetails)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(collegeContactDetails.addCollegesDetails);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);

                DataTable contactDetailsTable = new ListConverter().ToDataTable<ContactDetails>(collegeContactDetails.contactDetails);
                contactDetailsTable.SetTypeName("ContactDetailsType");
                dbparams.Add("@ContactDetails", contactDetailsTable.AsTableValuedParameter("ContactDetailsType"));

                // Convert the department details list to a DataTable
                DataTable departmentDetailsTable = new ListConverter().ToDataTable<DepartmentDetails>(collegeContactDetails.departmentDetails);
                departmentDetailsTable.SetTypeName("DepartmentDetailsType");
                dbparams.Add("@DepartmentDetails", departmentDetailsTable.AsTableValuedParameter("DepartmentDetailsType"));

                // Execute the stored procedure
                dbConnection.Execute("PROC_InsertCollegeDetails", dbparams, commandType: CommandType.StoredProcedure);

                // Get the result
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }


        public async Task<List<AddCollegesResponseModel>> GetCollegesDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<AddCollegesResponseModel>("PROC_GetCollegeDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
