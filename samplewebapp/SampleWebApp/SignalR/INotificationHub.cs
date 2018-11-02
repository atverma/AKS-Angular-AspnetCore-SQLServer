using System;
using System.Threading.Tasks;

namespace SampleWebApp.SignalR
{
    public interface INotificationHub
    {
        Task MessageNotification(string message);

        Task PublishMessageAck(string value);
    }
}
