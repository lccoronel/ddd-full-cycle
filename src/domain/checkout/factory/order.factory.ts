import { v4 as uuid } from 'uuid'
import { Order } from '../entity/Order'
import { OrderItem } from '../entity/OrderItem'

interface OrderFactoryProps {
    id: string
    customerId: string 
    items: {
        id: string
        name: string
        productId: string
        quantity: number
        price: number
    }[]
}

export class OrderFactory {
    static create(order: OrderFactoryProps): Order {
        const items = order.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.quantity,
                item.productId
            )
        })

        return new Order(order.id, order.customerId, items)
    }
}
