using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SampleWebAppWithHealthchecks
{
    internal class StartupHostedService : IHostedService, IDisposable
    {
        private readonly int _delaySeconds = 15;
        private readonly ILogger _logger;
        private readonly ReadinessHealthCheck _healthCheck;

        public StartupHostedService(ILogger<StartupHostedService> logger,
            ReadinessHealthCheck healthCheck)
        {
            _logger = logger;
            _healthCheck = healthCheck;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine("Start task.");

            // Simulate the effect of a long-running startup task.
            Task.Run(async () =>
            {
                await Task.Delay(_delaySeconds * 1000);
                _healthCheck.StartupTaskCompleted = true;
                _logger.LogInformation($"Startup Background Service has started.");
            });

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Startup Background Service is stopping.");

            return Task.CompletedTask;
        }

        public void Dispose()
        {
        }
    }
}
