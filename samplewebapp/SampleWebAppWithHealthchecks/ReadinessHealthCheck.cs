using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace SampleWebAppWithHealthchecks
{
    internal class ReadinessHealthCheck : IHealthCheck
    {
        internal ReadinessHealthCheck()
        {
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default(CancellationToken))
        {
            // Some Readiness check
            Console.WriteLine("ReadinessHealthCheck executed.");
            return Task.FromResult(HealthCheckResult.Healthy());
        }
    }
}