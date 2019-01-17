using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace SampleWebAppWithHealthchecks
{
    internal class LivenessHealthCheck : IHealthCheck
    {
        internal LivenessHealthCheck()
        {
        }

        public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default(CancellationToken))
        {
            // Some Liveness check
            Console.WriteLine("LivenessHealthCheck executed.");
            return Task.FromResult(HealthCheckResult.Healthy());
        }
    }
}