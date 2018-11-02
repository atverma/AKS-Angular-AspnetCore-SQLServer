using System;
namespace SampleWebApp
{
    public enum SingalRConfigMode
    {
        None = 0,
        ASPNetCoreSignalR = 1,
        AzureSignalRService = 2,
        Redis = 3
    }
}
