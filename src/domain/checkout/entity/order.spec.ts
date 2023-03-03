import { Order } from "./Order"
import { OrderItem } from "./OrderItem"

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() =>{
            let order = new Order("", "123", [])
        }).toThrowError("Id is required")
    })

    it("should throw error when customerId is empty", () => {
        expect(() =>{
            let order = new Order("123", "", [])
        }).toThrowError("CustomerId is required")
    })

    it("should throw error when items are empty", () => {
        expect(() =>{
            let order = new Order("123", "123", [])
        }).toThrowError("Items are required")
    })

    it("should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 100, 2, "p1")
        const item2 = new OrderItem("2", "Item 2", 100, 2, "p2")
        const order = new Order("123", "1234", [item, item2])
        const total = order.total()

        expect(total).toBe(400)
    })

    it("should throw error if the item quantity is less or equal 0", () => {
        expect(() => {
            const item = new OrderItem("1", "item 1", 100, 0, "p1")
            const order = new Order("1", "item 1", [item])
        }).toThrowError("Quantity must be greater than 0")
    })
})