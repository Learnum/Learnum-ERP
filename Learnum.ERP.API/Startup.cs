using Learnum.ERP.API.Helpers;
using Learnum.ERP.API.Middleware;
using Learnum.ERP.Shared.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Text.Json;

namespace Learnum.ERP.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });



            services.AddServices();
            services.AddRepositories();

            ConfigureAuthentication(services);

            services.AddCors(options => {
                options.AddPolicy("CloudstinePolicy", builder => builder
                 .WithOrigins("*")
                 //.SetIsOriginAllowed((host) => true)
                 .AllowAnyMethod()
                 .AllowAnyHeader());
            });

            var mvcBuilder = services.AddMvc(config =>
            {
                config.RespectBrowserAcceptHeader = true;
                config.Filters.Add(new ProducesAttribute("application/json"));

            });


            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    //options.SerializerSettings.DateFormatString = "yyyy-MMM-dd HH:mm:ss";

                    // This prevents the json serializer from parsing dates
                    options.SerializerSettings.DateParseHandling = DateParseHandling.DateTime;
                    // This changes how the timezone is converted - RoundtripKind keeps the timezone that was provided and doesn't convert it
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                }

            );

            services.AddSwaggerGen();


            services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    //options.SerializerSettings.DateFormatString = "yyyy-MMM-dd HH:mm:ss";

                    // This prevents the json serializer from parsing dates
                    options.SerializerSettings.DateParseHandling = DateParseHandling.DateTime;
                    // This changes how the timezone is converted - RoundtripKind keeps the timezone that was provided and doesn't convert it
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                }

            );


            services.Configure<IISOptions>(options =>
            {
                options.ForwardClientCertificate = false;
            });


        }

        private static void ConfigureAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = ApplicationSettings.TokenIssuer,
                    ValidAudience = ApplicationSettings.TokenAudience,
                    IssuerSigningKey = JwtSecurityKeyBuilder.Create(ApplicationSettings.TokenSymetricKey)
                };

                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        Console.WriteLine("OnAuthenticationFailed: " + context.Exception.Message);
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        Console.WriteLine("OnTokenValidated: " + context.SecurityToken);
                        return Task.CompletedTask;
                    }
                };
            });



            services.AddAuthorization();
        }



        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.EnvironmentName == "Dev")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseRouting();
            app.UseCors("LearnumPolicy");

            app.UseAuthentication();
            app.UseAuthorization();


            //#region Swagger related settings

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Learnum Core API v1");
                c.RoutePrefix = string.Empty;
                //c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
            });

            //#endregion


            app.UseEndpoints(routes =>
            {
                routes.MapControllerRoute(
                  name: "areas",
                  pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );

                routes.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });



        }
    }
}
