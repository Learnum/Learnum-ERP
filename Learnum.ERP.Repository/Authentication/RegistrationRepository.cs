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
    public interface IRegistrationRepository
    {
        /// <summary>
        /// used to register/update client profile details
        /// </summary>
        /// <param name="RegistrationMaster"></param>
        /// <returns></returns>
        Task<RegistrationResponse> Add(RegistrationMaster registrationMaster);

        Task<ResponseCode> VerifyOTP(long UserId, long EnteredOTP);
        Task<RegistrationResponse> GetUserDetails(RegistrationMaster registrationMaster);
        Task<Tuple<ResponseCode, UserDetails?>> UpdatePassword(RegistrationMaster registrationMaster);


        Task<UserDetails?> GetUserInfo(long? userId);


        /// <summary>
        /// used to get user login details
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>

        // Task<UserDetails> VerifyUser(LoginModel loginModel);
    }
    public class RegistrationRepository : BaseRepository, IRegistrationRepository
    {
        public IDbConnection dbConnection;
        public const string PROC_UserProfileManager = "PROC_AccountManager";

        public RegistrationRepository()
        {
            dbConnection = base.GetCoreConnection();
        }

        /// <summary>
        /// used to register/update client profile details
        /// </summary>
        /// <param name="registrationMaster"></param>
        /// <returns></returns>
        public async Task<RegistrationResponse> Add(RegistrationMaster registrationMaster)
        {
            registrationMaster.IsAdmin = true;
            registrationMaster.IsActive = true;
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(registrationMaster);
                param.Add("@Action", ActionFlag.SignUp);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                param.Add("@OutputUserId", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserProfileManager, param, commandType: CommandType.StoredProcedure);
                RegistrationResponse registrationResponse = new RegistrationResponse();
                registrationResponse.UserId = param.Get<int>("@OutputUserId");
                registrationResponse.ResponseCode = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(registrationResponse);
            }
        }

        public async Task<ResponseCode> VerifyOTP(long UserId, long EnteredOTP)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "VerifyOTP");
                dbparams.Add("@UserId", UserId);
                dbparams.Add("@OTP", EnteredOTP);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserProfileManager, dbparams, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(result);

            }

        }

        public async Task<RegistrationResponse> GetUserDetails(RegistrationMaster registrationMaster)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters(registrationMaster);
                dbparams.Add("@Action", "GetUserDetails");
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                IdentityUser? user = dbConnection.Query<IdentityUser>(PROC_UserProfileManager, dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                RegistrationResponse registrationResponse = new RegistrationResponse();
                registrationResponse.ResponseCode = (ResponseCode)dbparams.Get<int>("@Result");
                if (registrationResponse.ResponseCode == ResponseCode.Success)
                {
                    registrationResponse.UserId = user.UserId;
                    registrationResponse.passwordHash = user.PasswordHash;
                }
                return await Task.FromResult(registrationResponse);
            }
        }



        public async Task<Tuple<ResponseCode, UserDetails?>> UpdatePassword(RegistrationMaster registrationMaster)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                var dbparams = new DynamicParameters();
                dbparams.Add("@Action", "UpdatePassword");
                dbparams.Add("@UserId", registrationMaster.UserId);
                dbparams.Add("@PasswordHash", registrationMaster.PasswordHash);
                dbparams.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<UserDetails?>(PROC_UserProfileManager, dbparams, commandType: CommandType.StoredProcedure).FirstOrDefault();
                var responseCode = (ResponseCode)dbparams.Get<int>("@Result");
                return await Task.FromResult(new Tuple<ResponseCode, UserDetails?>(responseCode, result));

            }

        }



        public async Task<UserDetails?> GetUserInfo(long? UserId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {

                DynamicParameters param = new DynamicParameters();
                param.Add("@UserId", UserId);
                param.Add("@Action", "GetUserById");
                var result = dbConnection.Query<UserDetails?>(PROC_UserProfileManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }


    }
}
