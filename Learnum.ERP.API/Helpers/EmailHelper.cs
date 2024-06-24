using Learnum.ERP.Repository.Core;
using Learnum.ERP.Shared.Entities.Models.Comman;
using Learnum.ERP.Shared.Helpers;
using System.Net.Mail;
using System.Net;
using System.Reflection;

namespace Learnum.ERP.API.Helpers
{
    public class EmailHelper : BaseRepository
    {
        private static List<EmailConfiguration> AllEmailConfigurations = null;


        /// <summary>
        /// for bulk email send process (Excel Upload)
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="Parameter"></param>
        /// <param name="emailTemplateConfiguration"></param>
        /// <param name="emailID"></param>
        /// <param name="mobileNo"></param>
        /// <param name="mailonly"></param>
        /// <returns></returns>
        public bool SendNotification<T>(T Parameter, EmailTemplateConfiguration emailTemplateConfiguration, string? emailID, string? mobileNo, bool? mailonly = true, string? FileName = "")
        {
            bool result = false;
            try
            {
                if (emailID != null)
                {

                    if (emailTemplateConfiguration != null)
                    {
                        EmailConfigurationViewModel emailConfig = new EmailConfigurationViewModel();
                        emailConfig.SmtpClientHostName = emailTemplateConfiguration.SmtpServer;
                        emailConfig.SmtpClientHostServerAddress = emailTemplateConfiguration.SmtpServer;
                        emailConfig.SmtpClientPort = emailTemplateConfiguration.Port;
                        emailConfig.From = emailTemplateConfiguration.From;
                        //emailConfig.FromEmailPassword = emailTemplateConfiguration.Password;
                        emailConfig.FromEmailPassword = EncryptionHelper.Decrypt(emailTemplateConfiguration.Password);
                        emailConfig.To = emailID;
                        emailConfig.Subject = emailTemplateConfiguration.Subject;
                        emailConfig.MailBody = FormatMailBody<T>(emailTemplateConfiguration.Body, Parameter);
                        emailConfig.IsHTML = true;
                        /*string[] files = Directory.GetFiles(@"D:\Projects\POI\POI\Tax.POI\src\MainApp.Sln\Tax.POI.Web\Template\", "*.*", SearchOption.AllDirectories);
                        emailConfig.DocName = files;
                        emailConfig.AttachmentList = files;*/


                        string[] files = Directory.GetFiles(@"C:\ResumeFiles\", "_" + FileName, SearchOption.AllDirectories);
                        emailConfig.AttachmentList = files;
                        emailConfig.DocName = files;

                        //Attachment Code Here(One or Multiple Files From Folder)
                        //string FolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Attachments");
                        //string[] files = Directory.GetFiles(FolderPath, "*.docx", SearchOption.AllDirectories);
                        //emailConfig.DocName = files;

                        result = this.SendEmail(emailConfig);
                        if (result) { result = true; } else { result = false; }
                    }
                }
            }
            catch (Exception ex)
            {
                result = false;
            }
            return result;
        }

        public string FormatMailBody<T>(string templateData, T model)
        {
            string mailBody = templateData;
            if (model != null)
            {
                foreach (PropertyInfo pi in model.GetType().GetProperties())
                {
                    string value = string.Empty;
                    if (pi.PropertyType == typeof(decimal) || pi.PropertyType == typeof(double))
                    {
                        decimal? d = Convert.ToDecimal(pi.GetValue(model, null));
                        value = d.GetValueOrDefault().ToString("#0.00");
                    }
                    else
                    {
                        value = Convert.ToString(pi.GetValue(model, null));
                    }
                    mailBody = mailBody.Replace("{" + pi.Name + "}", value);
                }
            }
            return mailBody;
        }

        private bool SendEmail(EmailConfigurationViewModel emailConfig)
        {
            bool MailStatus = false;
            try
            {
                if (emailConfig.From != "")
                {
                    MailMessage newmsg = new MailMessage(emailConfig.From, emailConfig.To);
                    newmsg.Subject = emailConfig.Subject;
                    newmsg.Body = emailConfig.MailBody;
                    newmsg.IsBodyHtml = emailConfig.IsHTML;
                    if (emailConfig.DocName != null && emailConfig.DocName.Length > 0)
                    {
                        foreach (string attachment in emailConfig.DocName)
                        {

                            Attachment att = new Attachment(attachment);
                            newmsg.Attachments.Add(att);
                        }
                    }
                    //if (emailConfig.AttachmentList != null)
                    //{
                    //    foreach (Attachments attachments in emailConfig.AttachmentList)
                    //    {
                    //        int startIndex = attachments.Content.IndexOf("base64,");
                    //        if (startIndex > 0)
                    //        {
                    //            attachments.Content = attachments.Content.Substring(startIndex + 7, attachments.Content.Length - (startIndex + 7));
                    //        }
                    //        byte[] bytes = Convert.FromBase64String(attachments.Content);
                    //        MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length);
                    //        Attachment att = new Attachment(ms, attachments.FileName);
                    //        newmsg.Attachments.Add(att);
                    //    }
                    //}
                    System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(emailConfig.SmtpClientHostName, emailConfig.SmtpClientPort);
                    smtp.Host = emailConfig.SmtpClientHostServerAddress; //Or Your SMTP Server Address  
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(emailConfig.From, emailConfig.FromEmailPassword);
                    smtp.EnableSsl = true;
                    smtp.Timeout = 500000000;
                    System.Net.ServicePointManager.ServerCertificateValidationCallback = delegate (object s, System.Security.Cryptography.X509Certificates.X509Certificate certificate, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
                    {
                        return true;
                    };
                    smtp.Send(newmsg);
                    MailStatus = true;
                }
            }
            catch (Exception ex)
            {
                MailStatus = false;
            }
            return MailStatus;
        }







    }
}
