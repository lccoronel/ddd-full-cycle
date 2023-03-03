import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { OrderRepositoryInterface } from '../../domain/checkout/repository/order-repository.interface'
import { Order } from "../../domain/checkout/entity/Order";
import { OrderItem } from "../../domain/checkout/entity/OrderItem";

export default class OrderRepository implements OrderRepositoryInterface {
    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize

        await sequelize.transaction(async transaction => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction,
            })

            const items = entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
                order_id: entity.id,
            }))

            await OrderItemModel.bulkCreate(items, { transaction })

            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction }
            )
        })
    }

    async find(id: string): Promise<Order> {
        let orderModel

        try {
            orderModel = await OrderModel.findOne(
                { where: { id }, 
                include: ["items"]
            })
        } catch (error) {
            throw new Error("Order not found");
        }

        const items = orderModel.items.map(item => new OrderItem(
            item.id, 
            item.name, 
            item.price, 
            item.quantity, 
            item.product_id
        ))

        const order = new Order(orderModel.id, orderModel.customer_id, items)

        return order
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] })

        const orders = orderModels.map(orderModel => {
            const items = orderModel.items.map(item => new OrderItem(
                item.id, 
                item.name, 
                item.price, 
                item.quantity, 
                item.product_id
            ))
            const order = new Order(orderModel.id, orderModel.customer_id, items)

            return order
        })

        return orders
    }

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity
            }))
        },
        { 
            include: [{ model: OrderItemModel }]
        });
    }
}
