using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using SampleWebApp.SignalR;
using Microsoft.EntityFrameworkCore;

namespace SampleWebApp
{
    public class Startup
    {
        const string SignalRHub = "/api/SignalRHub";
        readonly SignalRConfigMode SingalRConfigMode = SignalRConfigMode.None;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string AzureSignalRConnectionString
        {
            get
            {
                return this.Configuration["AppConfiguration:AzureSignalRConnectionString"];
            }
        }

        public string RedisConnectionString
        {
            get
            {
                return this.Configuration["AppConfiguration:RedisConnectionString"];
            }
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.Configure<AppConfiguration>(Configuration.GetSection("AppConfiguration"));
            services.Configure<AppConfiguration>(Configuration);

            services.AddTransient<IUserContext, UserContext>();

            services.AddDbContext<UserContext>();

            switch (SingalRConfigMode)
            {
                case SignalRConfigMode.None:
                    // SignalR is disabled
                    break;
                case SignalRConfigMode.ASPNetCoreSignalR:
                    services.AddSignalR(options =>
                    {
                        options.EnableDetailedErrors = true;
                    });
                    break;
                case SignalRConfigMode.AzureSignalRService:
                    // Azure SignalR Service Scaleout
                    services.AddSignalR(options =>
                    {
                        options.EnableDetailedErrors = true;
                    }).AddAzureSignalR(configure =>
                    {
                        configure.ConnectionString = AzureSignalRConnectionString;
                    });
                    break;
                case SignalRConfigMode.Redis:
                    // Redis Scaleout however needs Sticky session
                    services.AddSignalR(options =>
                    {
                        options.EnableDetailedErrors = true;
                    }).AddRedis(RedisConnectionString);
                    break;
            }

            this.AddAuthentication(services);

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        private void AddAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(o =>
            {
                o.Authority = $"https://login.microsoftonline.com/{this.Configuration["AppConfiguration:TenantId"]}/v2.0";
                o.Audience = this.Configuration["AppConfiguration:Audience"];
                o.TokenValidationParameters.ValidateIssuer = true;
                o.TokenValidationParameters.ValidIssuer = $"https://login.microsoftonline.com/{this.Configuration["AppConfiguration:TenantId"]}/v2.0";
                o.RequireHttpsMetadata = true;
                o.IncludeErrorDetails = true;
                o.ClaimsIssuer = $"https://login.microsoftonline.com/{this.Configuration["AppConfiguration:TenantId"]}/v2.0";
                o.MetadataAddress = $"https://login.microsoftonline.com/{this.Configuration["AppConfiguration:TenantId"]}/v2.0/.well-known/openid-configuration";

                o.TokenValidationParameters.ValidateIssuerSigningKey = true;

                o.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;

                        if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments(SignalRHub)))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                        context.Response.ContentType = "application/json";
                        var err = context.Exception.ToString();
                        var result = JsonConvert.SerializeObject(new { err });
                        return context.Response.WriteAsync(result);
                    }
                };
                o.Validate();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");

            app.UseWebSockets();

            app.UseAuthentication();

            switch (SingalRConfigMode)
            {
                case SignalRConfigMode.None:
                    // SignalR is disabled
                    break;
                case SignalRConfigMode.ASPNetCoreSignalR:
                    app.UseSignalR((options) =>
                    {
                        options.MapHub<NotificationHub>(SignalRHub);
                    });
                    break;
                case SignalRConfigMode.AzureSignalRService:
                    // AZURE SignalR Scaleout
                    app.UseAzureSignalR((options) =>
                    {
                        options.MapHub<NotificationHub>(SignalRHub);
                    });
                    break;
                case SignalRConfigMode.Redis:
                    // Redis Scaleout
                    app.UseSignalR((options) =>
                    {
                        options.MapHub<NotificationHub>(SignalRHub);
                    });
                    break;
            }

            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                using (var context = serviceScope.ServiceProvider.GetService<UserContext>())
                {
                    // context.Database.EnsureDeleted();
                    context.Database.EnsureCreated();
                    context.Database.Migrate();
                    context.EnsureSeedData();
                }
            }

            app.UseMvc();
        }
    }
}
