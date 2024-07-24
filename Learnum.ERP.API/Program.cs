/*var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
*/


using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Helpers;
using Microsoft.AspNetCore.Hosting;
using Serilog;

namespace Learnum.ERP.API
{
    public class Program
    {

        static public IConfigurationRoot Configuration { get; set; }

        public static void Main(string[] args)
        {
            //GridMigration();
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            Configuration = builder.Build();

           ApplicationSettings.CoreConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CoreConnection"));

            //ApplicationSettings.CRMConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CRMConnection"));
           // ApplicationSettings.CoreConnectionString = Configuration.GetConnectionString("CoreConnection");
            //ApplicationSettings.CMSConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CMSConnection"));
            //ApplicationSettings.CommunicationConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CommunicationConnection"));
            //ApplicationSettings.TransactionConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("TransactionConnection"));

            //string encrypt = EncryptionHelper.Decrypt("amHlro5hyOdjl+JCTA2sSRRxpUcfaf3hbkthPHWNvo8=");
            //string encrypt = EncryptionHelper.Encrypt(@"Server=184.168.120.110;initial catalog=TaxBlock.Core_Dev;integrated security=true");
            //string encrypt = EncryptionHelper.Encrypt(@"Server=184.168.120.110;Initial Catalog=Taxblock.CMS_UAT;Integrated Security=false;User Id=sa;Password=Taxblock@2020;");
            //SQLMapper.DBConnection = ApplicationSettings.ConnectionString;
            //TaxBlock.Communication.Shared.Core.ApplicationSettings.CRMConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CRMConnection"));
            //ApplicationSettings.CoreConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CoreConnection"));
            //TaxBlock.Communication.Shared.Core.ApplicationSettings.CMSConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CMSConnection"));
            //TaxBlock.Communication.Shared.Core.ApplicationSettings.CommunicationConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CommunicationConnection"));
            //TaxBlock.Communication.Shared.Core.ApplicationSettings.TransactionConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("TransactionConnection"));

            //TaxBlock.Communication.Shared.Core.ApplicationSettings.SMSChillySettings = Configuration.GetSection(TaxBlock.Communication.Shared.Entities.Models.SMSChillySettings.SMSChillyKey).Get<TaxBlock.Communication.Shared.Entities.Models.SMSChillySettings>();
            //TaxBlock.Communication.Shared.Core.ApplicationSettings.SMTPSettings = Configuration.GetSection(TaxBlock.Communication.Shared.Entities.Models.SMTPSettings.SMTPSettingsKey).Get<TaxBlock.Communication.Shared.Entities.Models.SMTPSettings>();


            ApplicationSettings.TokenSymetricKey = Configuration["JWT:KEY"];
            ApplicationSettings.TokenIssuer = Configuration["JWT:Issuer"];
            ApplicationSettings.TokenAudience = Configuration["JWT:Issuer"];
            ApplicationSettings.RootPath = System.AppDomain.CurrentDomain.BaseDirectory;
            ApplicationSettings.UploadPath = Configuration["path:UploadPath"];

            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(Configuration)
            .WriteTo.RollingFile(Path.Combine(ApplicationSettings.RootPath + @"\Logs\", "log-{Date}.txt"))
            .CreateLogger();

            Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>().UseSerilog(); }).Build().Run();
        }

    }

}