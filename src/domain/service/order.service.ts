import { v4 as uuid } from 'uuid'

import { Customer } from "../entity/Customer";
import { Order } from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0)
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error('Order must have at least one item')
        }

        const order = new Order(uuid(), customer.id, items)
        customer.addRewardsPoints(order.total() / 2)

        return order
    }
}
