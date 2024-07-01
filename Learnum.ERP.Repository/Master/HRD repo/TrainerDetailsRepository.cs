using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.ViewModel;
using Learnum.ERP.Shared.Entities.Models;
using Learnum.ERP.Repository.Core;
using System.Data;
using Dapper;
using Learnum.ERP.Shared.Entities.Models.ViewModel.HRDModel;


namespace Learnum.ERP.Repository.Master
{
    public interface ITrainerDetailsRepository
    {
        Task<ResponseCode> InsertTrainerDetails(TrainerDetailsModel trainerDetailsModel);
        Task<List<TrainerDetailsResponseModel>> GetTrainerDetailsList();
    }
    public class TrainerDetailsRepository : BaseRepository, ITrainerDetailsRepository
    {
        public async Task<ResponseCode> InsertTrainerDetails(TrainerDetailsModel TrainerDetailsModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(TrainerDetailsModel);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Query<int>("", dbparams, commandType: CommandType.StoredProcedure);
                ResponseCode result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<List<TrainerDetailsResponseModel>> GetTrainerDetailsList()
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                var result = dbConnection.Query<TrainerDetailsResponseModel>("PROC_GetTrainerDetailsList", dbparams, commandType: CommandType.StoredProcedure).ToList();
                return await Task.FromResult(result);
            }
        }
    }
 }
