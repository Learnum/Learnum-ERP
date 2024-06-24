using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Authentication;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.Authentication;
using Learnum.ERP.Shared.Entities.Models.BulkEmail;
using Learnum.ERP.Shared.Entities.Models.Comman;
using Learnum.ERP.Shared.Helpers;
using Microsoft.AspNetCore.Mvc;
using static Learnum.ERP.Shared.Entities.Models.Comman.TemplateType;

namespace Learnum.ERP.API.Areas.Authentication
{
    [Area("Authentication")]
    [Route("api/Authentication/[controller]")]
    [ApiController]
    public class UserCredentialsController : ControllerBase
    {
        ILogger logger = null;
       // IBulkEmailRepository bulkEmailRepository;
        EmailHelper emailHelper = null;

        IUserCredentialsRepository userCredentialsRepository = null;
        public UserCredentialsController(IUserCredentialsRepository _userCredentialsRepository)/*, IBulkEmailRepository _bulkEmailRepository)*/
        {
            userCredentialsRepository = _userCredentialsRepository;
            //bulkEmailRepository = _bulkEmailRepository;
            emailHelper = new EmailHelper();
        }

        [HttpGet("verifyAccount/{userName}")]
        public async Task<IActionResult> VerifyAccount(string? userName)
        {
            if (userName == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }

            //generate new otp
            OTPGenerator otpGenerator = new OTPGenerator();
            string? OTP = otpGenerator.GenerateOTP();


            var result = await userCredentialsRepository.VerifyAccount(userName, OTP);
            if (result != null)
            {
               // EmailTemplateConfiguration templateConfiguration = bulkEmailRepository.GetEmailTemplateConfigurationDetails((int)EmailTemplateType.OTPForForgotPassword);
                UserDetailsForEmailViewModel userDetailsForEmailViewModel = new UserDetailsForEmailViewModel();
                userDetailsForEmailViewModel.EmailId = userName;
                userDetailsForEmailViewModel.MobileNo = result.MobileNo;
                userDetailsForEmailViewModel.OTP = OTP;
                // Send Email
               // emailHelper.SendNotification<UserDetailsForEmailViewModel>(userDetailsForEmailViewModel, templateConfiguration, userDetailsForEmailViewModel.EmailId, userDetailsForEmailViewModel.MobileNo);
                return Ok(result);
            }
            return BadRequest("Invalid Email ID");
        }


        /*[HttpPost("verifyOTP")]
        public async Task<IActionResult> VerifyOTP(LoginModel loginModel)
        {
            try
            {
                if (loginModel == null)
                {
                    return BadRequest("Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var result = await userCredentialsRepository.VerifyOTP(loginModel);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }*/
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(LoginModel loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            loginModel.PasswordHash = EncryptionHelper.Encrypt(loginModel.NewPassword);

            var result = await userCredentialsRepository.ResetPassword(loginModel);
            //if (result == ResponseCode.Success)
            //{
            //    try
            //    {
            //        var data = await userCredentialsRepository.GetUserData(loginModel.UserId);
            //        if (data != null)
            //        {
            //            ForgotPasswordMessage forgotPasswordMessage = new ForgotPasswordMessage();
            //            forgotPasswordMessage.UserName = data.UserName;
            //            forgotPasswordMessage.EmailId = data.Email;
            //            forgotPasswordMessage.Password = EncryptionHelper.Encrypt(loginModel.NewPassword);
            //            // this.pubisherService.ForgotPassword(forgotPasswordMessage);
            //            this.pubisherService.ForgotPassword_eMail(forgotPasswordMessage);
            //        }
            //    }
            //    catch (Exception ex)
            //    {
            //        logger.LogError(ex.ToString());
            //    }
            //}
            return Ok(result);
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordModel changePasswordModel)
        {
            if (changePasswordModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            ResponseObject responseObject = new ResponseObject();

            changePasswordModel.PasswordHash = EncryptionHelper.Encrypt(changePasswordModel.PasswordHash);
            changePasswordModel.NewPassword = EncryptionHelper.Encrypt(changePasswordModel.NewPassword);
            responseObject.ResponseCode = await userCredentialsRepository.ChangePassword(changePasswordModel);
            if (responseObject.ResponseCode == ResponseCode.Success)
            {
                LoginModel userDetails = await userCredentialsRepository.GetUserData((long)changePasswordModel.UserId);
                userDetails.PasswordHash = changePasswordModel.PasswordHash;

                //EmailTemplateConfiguration templateConfiguration = bulkEmailRepository.GetEmailTemplateConfigurationDetails((int)EmailTemplateType.ChangePassword);
                UserDetailsForEmailViewModel userDetailsForEmailViewModel = new UserDetailsForEmailViewModel();
                userDetailsForEmailViewModel.EmailId = userDetails.EmailId;
                userDetailsForEmailViewModel.MobileNo = userDetails.MobileNo;

                // Send Email
               // emailHelper.SendNotification<UserDetailsForEmailViewModel>(userDetailsForEmailViewModel, templateConfiguration, userDetailsForEmailViewModel.EmailId, userDetailsForEmailViewModel.MobileNo);
                responseObject.Message = "Password Changed successfully";

                return Ok(responseObject);
            }
            return BadRequest("Failed to Reset Password...Please check old password");
        }

        /*[HttpPost("AddContactUs")]
        public async Task<IActionResult> AddContactUs(ContactUsDetails contactUsDetails)
        {
            try
            {
                if (contactUsDetails == null)
                {
                    return BadRequest("Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }
                var result = await userCredentialsRepository.AddContactUs(contactUsDetails);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw;
            }
        }*/

       



    }
}
