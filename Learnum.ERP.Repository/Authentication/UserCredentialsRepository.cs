using Dapper;
using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.Authentication;
using Learnum.ERP.Shared.Helpers;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Repository.Authentication
{
    public interface IUserCredentialsRepository
    {
        /// <summary>
        /// used to verify user account
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>

        Task<LoginModel?> VerifyAccount(string? EmailId, string? OTP);

        /// <summary>
        /// used to saveOTP
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        Task<ResponseCode> SaveOTP(LoginModel loginModel);

        /// <summary>
        /// used to verify otp
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        Task<ResponseCode> VerifyOTP(LoginModel loginModel);

        Task<Tuple<ResponseCode, ContactUsDetails?>> AddContactUs(ContactUsDetails contactUsDetails);


        /// <summary>
        /// used to Change user Password
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        Task<ResponseCode> ChangePassword(ChangePasswordModel changePasswordModel);

        /// <summary>
        /// used to reset user Password
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        Task<ResponseCode> ResetPassword(LoginModel loginModel);

        Task<LoginModel> GetUserData(long userId);

    }
    public class UserCredentialsRepository : BaseRepository, IUserCredentialsRepository
    {

        public IDbConnection dbConnection;

        public const string PROC_UserCredentialManager = "PROC_UserCredentialManager";


        public UserCredentialsRepository()
        {
            dbConnection = base.GetCoreConnection();
        }

        /// <summary>
        /// used to verify user account
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        /// 
        public async Task<LoginModel?> VerifyAccount(string? EmailId, string? OTP)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Find");
                param.Add("@EmailId", EmailId);
                param.Add("@OTP", OTP);
                var result = dbConnection.Query<LoginModel?>(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

        /// <summary>
        /// used to saveOTP
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public async Task<ResponseCode> SaveOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(loginModel);
                param.Add("@Action", ActionFlag.SaveOTP);
                param.Add("@UserID", loginModel.UserId);
                param.Add("@OTP", loginModel.OTP);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }


        /// <summary>
        /// used to verify otp
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public async Task<ResponseCode> VerifyOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {

                OTPGenerator otpGenerator = new OTPGenerator();
                string OTP = otpGenerator.GenerateOTP();
                DynamicParameters param = new DynamicParameters(loginModel);
                param.Add("@Action", ActionFlag.VerifyOTP);
                param.Add("@OTP", loginModel.OTP);
                param.Add("@UserID", loginModel.UserId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }


        /// <summary>
        /// used to Change user Password
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public async Task<ResponseCode> ChangePassword(ChangePasswordModel changePasswordModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(changePasswordModel);
                param.Add("@Action", "ChangePassword");
                param.Add("@PasswordHash", changePasswordModel.PasswordHash);
                param.Add("@UserId", changePasswordModel.UserId);
                param.Add("@NewPassword", changePasswordModel.NewPassword);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }


        /// <summary>
        /// used to reset user Password
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public async Task<ResponseCode> ResetPassword(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(loginModel);
                param.Add("@Action", "ResetPassword");
                param.Add("@NewPassword", loginModel.NewPassword);
                param.Add("@EmailId", loginModel.EmailId);
                param.Add("@UserId", loginModel.UserId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure);
                var result = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(result);
            }
        }

        public async Task<LoginModel> GetUserData(long userId)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetUserData");
                param.Add("@UserId", userId);
                var result = dbConnection.Query<LoginModel>(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

        public async Task<Tuple<ResponseCode, ContactUsDetails?>> AddContactUs(ContactUsDetails contactUsDetails)
        {
            using (IDbConnection dbConnection = base.GetCoreConnection())
            {
                DynamicParameters param = new DynamicParameters(contactUsDetails);
                param.Add("@Action", "SaveContactUs");
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                var result = dbConnection.Query<ContactUsDetails?>(PROC_UserCredentialManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                var responseCode = (ResponseCode)param.Get<int>("@Result");
                return await Task.FromResult(new Tuple<ResponseCode, ContactUsDetails?>(responseCode, result));
            }
        }
    }
}
