using System;
namespace SampleWebApp
{
    public enum SignalRConfigMode
    {
        None = 0,
        ASPNetCoreSignalR = 1,
        AzureSignalRService = 2,
        Redis = 3
    }
}
