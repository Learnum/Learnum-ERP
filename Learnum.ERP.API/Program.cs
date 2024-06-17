using Serilog;
using System;
using Learnum.ERP.Shared.Core;
using Learnum.ERP.Shared.Helpers;

namespace Learnum.ERP.API
{
    public class Program
    {

        static public IConfigurationRoot Configuration { get; set; }

        public static void Main(string[] args)
        {
            //GridMigration();
            //string connectionString = "server=164.52.219.47;database=Cloudstine.Core;user=ITHead_UAT;pwd=TaxPat@2023;";

            // Encrypt the connection string
            //string encryptedConnectionString = EncryptionHelper.Encrypt(connectionString);

            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json");
            Configuration = builder.Build();


            ApplicationSettings.CoreConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("CoreConnection"));

           /* ApplicationSettings.TDSConnectionString = EncryptionHelper.Decrypt(Configuration.GetConnectionString("TDSConnection"));*/


            //string encrypt = EncryptionHelper.Decrypt(@"amHlro5hyOdjl+JCTA2sSRRxpUcfaf3hbkthPHWNvo8=");
            //string encrypt = EncryptionHelper.Encrypt(@"Server=184.168.120.110;initial catalog=Cloudstine.Core_Dev;integrated security=true");
            //string encrypt = EncryptionHelper.Encrypt(@"Server=184.168.120.110;Initial Catalog=Cloudstine.CMS_UAT;Integrated Security=false;User Id=sa;Password=Cloudstine@2020;");
            //SQLMapper.DBConnection = ApplicationSettings.ConnectionString;

            ApplicationSettings.TokenSymetricKey = Configuration["JWT:KEY"];
            ApplicationSettings.TokenIssuer = Configuration["JWT:Issuer"];
            ApplicationSettings.TokenAudience = Configuration["JWT:Issuer"];
            ApplicationSettings.RootPath = System.AppDomain.CurrentDomain.BaseDirectory;
            ApplicationSettings.UploadPath = System.AppDomain.CurrentDomain.BaseDirectory;

            Log.Logger = new LoggerConfiguration()
           .ReadFrom.Configuration(Configuration)
           .WriteTo.RollingFile(Path.Combine(ApplicationSettings.RootPath + @"\Logs\", "log-{Date}.txt"))
           .CreateLogger();

            Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>().UseSerilog(); }).Build().Run();

        }

    }
}