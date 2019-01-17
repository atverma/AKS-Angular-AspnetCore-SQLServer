using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace SampleWebAppWithHealthchecks
{
    public static class HealthCheckBuilderExtensions
    {
        public static IHealthChecksBuilder AddLivenessHealthCheck(
            this IHealthChecksBuilder builder,
            string name,
            HealthStatus? failureStatus,
            IEnumerable<string> tags)
        {
            return builder.Add(new HealthCheckRegistration(
                name,
                instance => new LivenessHealthCheck(),
                failureStatus,
                tags));
        }

        public static IHealthChecksBuilder AddReadinessHealthCheck(
            this IHealthChecksBuilder builder,
            string name,
            HealthStatus? failureStatus,
            IEnumerable<string> tags)
        {
            return builder.Add(new HealthCheckRegistration(
                name,
                instance => new ReadinessHealthCheck(),
                failureStatus,
                tags));
        }
    }
}
