using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SampleWebAppWithHealthchecks
{
    internal class ReadinessHealthCheck : IHealthCheck
    {
        public ReadinessHealthCheck()
        {
        }

        public bool StartupTaskCompleted { get; set; } = false;

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default(CancellationToken))
        {
            // Some Readiness check
            Console.WriteLine("Readiness health check executed.");

            if (StartupTaskCompleted)
            {
                return Task.FromResult(
                    HealthCheckResult.Healthy("The startup task is finished."));
            }

            return Task.FromResult(
                HealthCheckResult.Unhealthy("The startup task is still running."));
        }
    }
}