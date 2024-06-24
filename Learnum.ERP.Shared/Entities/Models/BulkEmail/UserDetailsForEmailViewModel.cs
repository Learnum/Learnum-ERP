using Learnum.ERP.Shared.Entities.Models.Comman;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.BulkEmail
{
    public class UserDetailsForEmailViewModel
    {
        public long UserId { get; set; }
        public string? ClientName { get; set; }
        public string? FName { get; set; }
        public string? MName { get; set; }
        public string? LName { get; set; }
        public string? EmailId { get; set; }
        public string? MobileNo { get; set; }
        public string? UserPan { get; set; }
        public long? CompanyFinancialId { get; set; }
        public long? CompanyId { get; set; }
        public long? UserFinancialId { get; set; }
        public string? EmpId { get; set; }
        public string? CompanyName { get; set; }
        public string? Link { get; set; }
        public string? ReleaseFrom { get; set; }
        public string? LockTo { get; set; }
        public string? ToDate { get; set; }
        public string? OTP { get; set; }
        public string? ApplicationName { get; set; }
        public string[]? DocName { get; set; }
        public List<Attachments>? AttachmentList { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? NotificationBody { get; set; }
        public long? InvestmentCycletypeId { get; set; }
        public string? Subject { get; set; }
        public string? Comments { get; set; }
        public string? Location { get; set; }
        public string? DesignationName { get; set; }
    }

    /*    public class Attachments
        {
            public string? Content { get; set; }
            public string? FileName { get; set; }
        }*/
}
