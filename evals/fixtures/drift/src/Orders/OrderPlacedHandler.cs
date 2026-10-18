using Contracts;

namespace Orders;

public class OrderPlacedHandler(IEventBus bus)
{
    public Task Handle(Guid orderId) => bus.Publish(new OrderPlaced(orderId));
}
