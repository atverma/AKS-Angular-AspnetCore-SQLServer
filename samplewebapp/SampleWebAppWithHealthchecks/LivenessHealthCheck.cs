using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace SampleWebAppWithHealthchecks
{
    internal class LivenessHealthCheck : IHealthCheck
    {
        public LivenessHealthCheck()
        {
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default(CancellationToken))
        {
            // Some Liveness check
            Console.WriteLine("Liveness Health check executed.");
            return Task.FromResult(HealthCheckResult.Healthy());
        }
    }
}