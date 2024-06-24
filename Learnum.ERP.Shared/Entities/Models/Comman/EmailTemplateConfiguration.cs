using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Entities.Models.Comman
{
    public class EmailTemplateConfiguration
    {
        public long EmailTemplateId { get; set; }
        public string Body { get; set; }
        public long? TemplateTypeId { get; set; }
        public string Subject { get; set; }
        public long CompanyId { get; set; }
        public long CompanyFinancialId { get; set; }
        public long EmailConfigurationId { get; set; }
        public bool? IsActive { get; set; }
        public string FromName { get; set; }
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool IsDefault { get; set; }
        public long CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public long UpdatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class EmailConfigurationViewModel
    {
        public string Subject { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string CC { get; set; }
        public string BCC { get; set; }
        public string MailBody { get; set; }
        public bool IsHTML { get; set; }
        public string[] DocName { get; set; }
        public string[] AttachmentList { get; set; }
        public string FromEmailPassword { get; set; }
        public string SmtpClientHostName { get; set; }
        public string SmtpClientHostServerAddress { get; set; }
        public int SmtpClientPort { get; set; }
    }

    public class Attachments
    {
        public string Content { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
    }
}
