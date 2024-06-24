using Learnum.ERP.API.Helpers;
using Learnum.ERP.Repository.Authentication;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Entities.Models.Authentication;
using Learnum.ERP.Shared.Entities.Models.BulkEmail;
using Learnum.ERP.Shared.Entities.Models.Comman;
using Learnum.ERP.Shared.Helpers;
using Microsoft.AspNetCore.Mvc;
using static Learnum.ERP.Shared.Entities.Models.Comman.TemplateType;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Learnum.ERP.API.Areas.Authentication
{
    [Area("Authentication")]
    [Route("api/Authentication/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        ILogger logger = null;
        EmailHelper emailHelper = null;
        IAccountRepository accountRepository = null;
       // IBulkEmailRepository bulkEmailRepository;
        IRegistrationRepository registrationRepository = null;


        public AccountController(ILogger<AccountController> _logger,
                 IRegistrationRepository _registrationRepository,
                  IAccountRepository _accountRepository)/*, IBulkEmailRepository _bulkEmailRepository)*/
        {
            logger = _logger;
            emailHelper = new EmailHelper();
            accountRepository = _accountRepository;
            //this.bulkEmailRepository = _bulkEmailRepository;
            registrationRepository = _registrationRepository;
        }

        /// <summary>
        /// UserRegistration
        /// used to register/update User profile details
        /// </summary>
        /// <param name="registrationMaster"></param>
        /// <returns></returns>

        [HttpPost("registration")]
        public async Task<IActionResult> Add(RegistrationMaster? registrationMaster)
        {
            try
            {
                if (registrationMaster == null)
                {
                    return BadRequest("Object is null");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model object");
                }

                //generate new otp
                OTPGenerator otpGenerator = new OTPGenerator();
                string OTP = otpGenerator.GenerateOTP();
                registrationMaster.OTP = OTP;

               // EmailTemplateConfiguration templateConfiguration = bulkEmailRepository.GetEmailTemplateConfigurationDetails((int)EmailTemplateType.OTPForRegistration);
                UserDetailsForEmailViewModel userDetailsForEmailViewModel = new UserDetailsForEmailViewModel();
                userDetailsForEmailViewModel.EmailId = registrationMaster.EmailId;
                userDetailsForEmailViewModel.MobileNo = registrationMaster.MobileNo;
                userDetailsForEmailViewModel.OTP = registrationMaster.OTP;

                var user = await registrationRepository.GetUserDetails(registrationMaster);
                if (user != null)
                {
                    if (user.passwordHash != null)
                    {
                        return BadRequest("EmailId already Registered");
                    }
                    else if (user.ResponseCode == ResponseCode.NotFound)
                    {

                    }
                    else
                    {
                        // Send Email
                      //  emailHelper.SendNotification<UserDetailsForEmailViewModel>(userDetailsForEmailViewModel, templateConfiguration, userDetailsForEmailViewModel.EmailId, userDetailsForEmailViewModel.MobileNo);
                        return Ok(user);

                    }
                }

                var result = await registrationRepository.Add(registrationMaster);
                if (result.ResponseCode == ResponseCode.Success)
                {
                    // Send Email
                  //  emailHelper.SendNotification<UserDetailsForEmailViewModel>(userDetailsForEmailViewModel, templateConfiguration, userDetailsForEmailViewModel.EmailId, userDetailsForEmailViewModel.MobileNo);
                    return Ok(result);
                }

                else if (result.ResponseCode == ResponseCode.EmailAlreadyExists)
                {
                    return BadRequest("Email Id Already exists");
                }
                else if (result.ResponseCode == ResponseCode.UserNameAlreadyExists)
                {
                    return BadRequest("UserName Already exists");
                }
                else if (result.ResponseCode == ResponseCode.MobileAlreadyExists)
                {
                    return BadRequest("Mobile No Already exists");
                }
                else
                {
                    return BadRequest("Fail to register");
                }

            }
            catch (Exception ex)
            {
                throw;
            }
        }




       /* [HttpGet("VerifyOTP/{UserId}/{EnteredOTP}")]
        public async Task<IActionResult> VerifyOTP(long UserId, long EnteredOTP)
        {
            var result = await registrationRepository.VerifyOTP(UserId, EnteredOTP);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Record not added");
        }*/

        [HttpPost("UpdatePassword")]
        public async Task<IActionResult> UpdatePassword(RegistrationMaster registrationMaster)
        {
            registrationMaster.PasswordHash = EncryptionHelper.Encrypt(registrationMaster.PasswordHash);
            var result = await registrationRepository.UpdatePassword(registrationMaster);
            if (result != null)
            {
                string idToken = SetTokenData(result.Item2);
                result.Item2.ApplicationToken = idToken;

             //   EmailTemplateConfiguration templateConfiguration = bulkEmailRepository.GetEmailTemplateConfigurationDetails((int)EmailTemplateType.RegisteredNewEmployee);
                UserDetailsForEmailViewModel userDetailsForEmailViewModel = new UserDetailsForEmailViewModel();
                userDetailsForEmailViewModel.EmailId = result.Item2.EmailId;
                userDetailsForEmailViewModel.MobileNo = result.Item2.PhoneNumber;
                // Send Email
               // emailHelper.SendNotification<UserDetailsForEmailViewModel>(userDetailsForEmailViewModel, templateConfiguration, userDetailsForEmailViewModel.EmailId, userDetailsForEmailViewModel.MobileNo);
                return Ok(result);
            }
            return BadRequest("Record not added");
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel? loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest("Object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            //loginDetailViewModel.Password = EncryptionHelper.Decrypt(loginDetailViewModel.Password);
            loginModel.PasswordHash = EncryptionHelper.Encrypt(loginModel.PasswordHash);
            var result = await accountRepository.VerifyUser(loginModel);
            if (result != null)
            {
                if (result.Item1 == ResponseCode.Success)
                {
                    string idToken = SetTokenData(result.Item2);
                    result.Item2.ApplicationToken = idToken;
                    return Ok(result);
                }
                else
                {
                    return Ok(result);
                }
            }
            else { return BadRequest(); }

        }

        /// <summary>
        /// Used to set token data by clientData
        /// </summary>
        /// <param name="userData"></param>
        /// <returns></returns>
        private string SetTokenData(UserDetails userData)
        {
            if (string.IsNullOrEmpty(userData.UserName))
            {
                userData.UserName = userData.EmailId;
            }
            //create claims details based on the user information
            List<Claim> userClaims = new List<Claim> {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim(ClaimTypes.Sid, userData.UserId.ToString()),
                    new Claim(ClaimTypes.Name, userData.UserName.ToString()),
                    new Claim(ClaimTypes.Actor, "Admin"),
                    new Claim("UserId", userData.UserId.ToString()),
                    new Claim("EmailId", userData.EmailId.ToString()),
                };


            //Create token data and set the time when it expires

            var token = new JwtTokenBuilder()
            .AddSecurityKey(JwtSecurityKeyBuilder.Create(ApplicationSettings.TokenSymetricKey))
            .AddSubject(userData.UserName)
            .AddIssuer(ApplicationSettings.TokenIssuer)
            .AddAudience(ApplicationSettings.TokenAudience)
            .AddClaims(userClaims)
            .AddExpiry(1740)
            .Build();

            return token.Value;

        }
    }
}
