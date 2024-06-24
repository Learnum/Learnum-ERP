using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Learnum.ERP.Shared.Core
{
    public class ApplicationSettings
    {
        public static string CoreConnectionString { get; set; }
        public static string TDSConnectionString { get; set; }
        public static string TransactionConnectionString { get; set; }
        public static string CMSConnectionString { get; set; }
        public static string CommunicationConnectionString { get; set; }
        public static string UploadPath { get; set; }
        public static string EncryptionKey { get; set; }
        public static string TokenSymetricKey { get; set; }
        public static string TokenIssuer { get; set; }
        public static string TokenAudience { get; set; }
        public static string DateFormat { get { return "dd-MMM-yyyy"; } }
        public static string RootPath { get; set; }

    }
}
