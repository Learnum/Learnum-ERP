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
using Learnum.ERP.Shared.Entities.Models.ViewModel.BuisnessLeadModel;

namespace Learnum.ERP.Repository.Master.CounsellorDashboard
{

    public interface IAddCollegesRepository
    {
        Task<ResponseCode> InsertCollegesDetails(CollegeContactDetails collegeContactDetails);
        Task<List<AddCollegesResponseModel>> GetCollegesDetailsList();
    }
    public class AddCollegesRepository : BaseRepository, IAddCollegesRepository
    {
        public async Task<ResponseCode> InsertCollegesDetails(CollegeContactDetails collegeContactDetails)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(collegeContactDetails.addCollegesDetails);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbparams.Add("@Action", "InsertADDCollegeDetails");

                DataTable ContactDetailsTable = new ListConverter().ToDataTable<ContactDetails>(collegeContactDetails.contactDetails);
                ContactDetailsTable.SetTypeName("ContactDetailsType");
                dbparams.Add("@ContactDetailsType", ContactDetailsTable.AsTableValuedParameter("ContactDetailsType"));

                DataTable DepartmentDetailsTable = new ListConverter().ToDataTable<DepartmentDetails>(collegeContactDetails.departmentDetails);
                DepartmentDetailsTable.SetTypeName("DepartmentDetailsType");
                dbparams.Add("@DepartmentDetailsType", DepartmentDetailsTable.AsTableValuedParameter("DepartmentDetailsType"));

                dbConnection.Query<int>("PROC_ADDCollege", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<AddCollegesResponseModel>> GetCollegesDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "GetADDCollegeDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<AddCollegesResponseModel>("PROC_ADDCollege", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
}
