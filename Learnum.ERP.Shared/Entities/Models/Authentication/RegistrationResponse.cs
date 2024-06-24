using Learnum.ERP.Shared.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Authentication
{
    public class RegistrationResponse
    {
        public ResponseCode ResponseCode { get; set; }
        public long? UserId { get; set; }
        public string? passwordHash { get; set; }
    }
}
