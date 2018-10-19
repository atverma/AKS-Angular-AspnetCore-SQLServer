using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace SampleWebApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) => WebHost.CreateDefaultBuilder(args)
           .ConfigureAppConfiguration((hostingContext, config) =>
           {
               var env = hostingContext.HostingEnvironment;

               if (env.IsDevelopment())
               {
                   config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true)
                        .AddEnvironmentVariables();
               }
               else
               {
                   config.AddJsonFile("SampleWebApp/appsettings.json", optional: false, reloadOnChange: true)
                        .AddJsonFile($"SampleWebApp/appsettings.{env.EnvironmentName}.json", optional: false, reloadOnChange: true)
                        .AddJsonFile("/app/AppConfig.json", optional: false, reloadOnChange: true)
                        .AddEnvironmentVariables();
               }

               IConfiguration configInProgress = config.Build();

               if (Convert.ToBoolean(configInProgress["AppConfiguration:IsVaultEnabled"]))
               {
                   // Read Key Vault settings from appsettings
                   config.AddAzureKeyVault(configInProgress["AppConfiguration:Vault"],
                                            configInProgress["AppConfiguration:ClientId"],
                                            configInProgress["AppConfiguration:ClientSecret"]);

                   config.Build();
               }

           }).UseStartup<Startup>();
    }
}
