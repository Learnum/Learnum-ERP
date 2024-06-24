using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.Authentication;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Authentication
{
    public interface IAccountRepository
    {
        /// <summary>
        /// used to register/update user profile details
        /// </summary>
        /// <param name="userMaster"></param>
        /// <returns></returns>
        Task<Tuple<ResponseCode, long>> Add(UserMaster userMaster);

        Task<IdentityUser?> GetIdentityUserInfo(long? userId);

        /// <summary>
        /// used to get user login details
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>

        Task<Tuple<ResponseCode, UserDetails?>> VerifyUser(LoginModel? loginModel);


    }
    public class AccountRepository : BaseRepository, IAccountRepository
    {
        public IDbConnection dbConnection;

        public const string PROC_AccountManager = "PROC_AccountManager";


        public AccountRepository()
        {
            dbConnection = base.GetCoreConnection();
        }

        /// <summary>
        /// used to register/update client profile details
        /// </summary>
        /// <param name="userMaster"></param>
        /// <returns></returns>
        public async Task<Tuple<ResponseCode, long>> Add(UserMaster userMaster)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(userMaster);
                param.Add("@Action", ActionFlag.SignUp);
                param.Add("@OutputUserId", DbType.Int64, direction: ParameterDirection.InputOutput);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_AccountManager, param, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)param.Get<int>("@Result");
                var UserId = param.Get<int>("@OutputUserId");
                return await Task.FromResult(new Tuple<ResponseCode, long>(result, UserId));
            }
        }


        /// <summary>
        /// used to get user login details
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public async Task<Tuple<ResponseCode, UserDetails?>> VerifyUser(LoginModel? loginModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "VerifyUser");
                param.Add("@EmailId", loginModel.EmailId);
                param.Add("@PasswordHash", loginModel.PasswordHash);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<UserDetails?>(PROC_AccountManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                var responseCode = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(new Tuple<ResponseCode, UserDetails?>(responseCode, result));
            }
        }


        public async Task<IdentityUser?> GetIdentityUserInfo(long? UserId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserId", UserId);
                param.Add("@Action", "GetIdentityUserInfo");
                var result = dbConnection.Query<IdentityUser>(PROC_AccountManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

    }
}
