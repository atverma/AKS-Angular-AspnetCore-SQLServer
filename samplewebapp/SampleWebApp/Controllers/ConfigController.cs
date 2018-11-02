using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace SampleWebApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigController : ControllerBase
    {
        private readonly UserContext _context;
        private IOptionsSnapshot<AppConfiguration> _appSettings;

        public ConfigController(IOptionsSnapshot<AppConfiguration> appSettings, UserContext context)
        {
            _appSettings = appSettings;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new List<string>()
            {
                $"DatabaseConnectionStringFromAppsettings: {_appSettings.Value.DatabaseConnectionStringFromAppsettings}",
                $"DatabaseConnectionStringFromDockerEnvVariable: {_appSettings.Value.DatabaseConnectionStringFromDockerEnvVariable}",
                $"DatabaseConnectionStringFromKubernetesEnvVariable: {_appSettings.Value.DatabaseConnectionStringFromKubernetesEnvVariable}",
                $"DatabaseConnectionStringFromKubernetesMountedFile: {_appSettings.Value.DatabaseConnectionStringFromKubernetesMountedFile}",
                $"DatabaseConnectionStringFromAzureKeyVault: {_appSettings.Value.DatabaseConnectionStringFromAzureKeyVault}"
            };
        }
    }
}
