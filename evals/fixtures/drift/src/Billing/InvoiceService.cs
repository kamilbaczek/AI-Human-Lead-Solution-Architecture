using Orders.Persistence;

namespace Billing;

public class InvoiceService(OrdersDbContext orders)
{
    public decimal TotalFor(Guid orderId) =>
        orders.OrderLines.Where(l => l.OrderId == orderId).Sum(l => l.Price);
}
