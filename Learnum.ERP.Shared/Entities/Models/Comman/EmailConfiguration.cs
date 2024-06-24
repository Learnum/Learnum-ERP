using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class EmailConfiguration
    {
        public string FromName { get; set; }
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public long CompanyFinancialId { get; set; }
        public bool IsDefault { get; set; }
    }
}
