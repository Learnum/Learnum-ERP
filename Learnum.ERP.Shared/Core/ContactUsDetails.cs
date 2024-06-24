using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Core
{
    public class ContactUsDetails
    {
        public long ContactId { get; set; }
        public string? ContactName { get; set; }
        public string? EmailId { get; set; }
        public long? MobileNo { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }

    }
}
