using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.SignalR;

namespace SampleWebApp.SignalR
{
    [Authorize]
    public class NotificationHub : Hub<INotificationHub>
    {
        public async Task PublishMessage(string message)
        {
            await this.Clients.AllExcept(this.Context.ConnectionId).MessageNotification($"Broadcast: {message}");
            await this.Clients.Caller.PublishMessageAck($"Broadcast Ack: {message}");
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
