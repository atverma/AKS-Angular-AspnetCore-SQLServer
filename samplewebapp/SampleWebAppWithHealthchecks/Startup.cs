using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace SampleWebAppWithHealthchecks
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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddHostedService<StartupHostedService>();
            services.AddSingleton<ReadinessHealthCheck>();
            services.AddSingleton<LivenessHealthCheck>();
            
            services.AddHealthChecks()
            .AddLivenessHealthCheck("Liveness", HealthStatus.Unhealthy, new List<string>(){"Liveness"})
            .AddReadinessHealthCheck("Readiness", HealthStatus.Unhealthy, new List<string>{ "Readiness" });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHealthChecks("/health/live", new HealthCheckOptions()
            {
                Predicate = check => check.Name == "Liveness"
            })
            .UseHealthChecks("/health/ready", new HealthCheckOptions()
            {
                Predicate = check => check.Name == "Readiness",
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
