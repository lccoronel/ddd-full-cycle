import { Customer } from "../../customer/entity/Customer"
import { Order } from "../entity/Order"
import { OrderItem } from "../entity/OrderItem"
import OrderService from "./order.service"

describe("Order service unit tests", () => {

    it("should place an order", () => {
        const customer = new Customer("1", "Customer 1")
        const item1 = new OrderItem("1", "item 1", 10, 1, "product 1")

        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })

    it("should get total all orders", () => {
        const item1 = new OrderItem("1", "item 1", 100, 1, "product 1")
        const item2 = new OrderItem("2", "item 2", 200, 2, "product 2")

        const order1 = new  Order("1", "user 1", [item1])
        const order2 = new  Order("2", "user 1", [item2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(500)
    })
})