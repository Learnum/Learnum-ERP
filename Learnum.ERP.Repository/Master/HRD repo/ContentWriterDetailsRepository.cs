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
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;

namespace Learnum.ERP.Repository.Master
{
    public interface IContentWriterDetailsRepository
    {
        Task<ResponseCode> InsertContentWriterDetails(ContentWriterDetailsModel contentwriterDetailsModel);
        Task<List<ContentWriterDetailsResponseModel>> GetContentWriterDetailsList();
    }
    public class ContentWriterDetailsRepository : BaseRepository, IContentWriterDetailsRepository
    {
        public async Task<ResponseCode> InsertContentWriterDetails(ContentWriterDetailsModel contentwriterDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(contentwriterDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("PROC_InsertContentWriterForSubject", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<ContentWriterDetailsResponseModel>> GetContentWriterDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Result", dbType: DbType.Int64, direction: ParameterDirection.Output);
                var result = (await dbConnection.QueryAsync<ContentWriterDetailsResponseModel>("PROC_GetContentWriterForSubject", dbparams, commandType: CommandType.StoredProcedure)).ToList();
                return result;
            }
        }

    }
}
