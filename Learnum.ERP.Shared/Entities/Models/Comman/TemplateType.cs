using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class TemplateType
    {
        public enum EmailTemplateType
        {
            RegisteredNewEmployee = 1,
            ChangePassword = 2,
            ForgotPassword = 3,
            OTPForRegistration = 4,
            OTPForForgotPassword = 5,
            SubUserRegistration = 6,
            ApplicationSubscription = 7,
            ContactUs = 8,
            Carrer = 9
        }

    }
}
