import { Address } from "./Address"
import { Customer } from "./Customer"

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() =>{
            let customer = new Customer("", "John")
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() =>{
            let customer = new Customer("123", "")
        }).toThrowError("Name is required")
    })

    it("should change name", () => {
        const customer = new Customer("123", "John")
        customer.changeName("James")

        expect(customer.name).toBe("James")
    })

    it("should activate customer", () => {
        let customer = new Customer("123", "Lucas")
        const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")

        customer.Address = address
        customer.activate()

        expect(customer.isActive()).toBe(true)
    })

    it("should deactivate customer", () => {
        let customer = new Customer("123", "Lucas")

        customer.deactivate()

        expect(customer.isActive()).toBe(false)
    })

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("123", "Lucas")

            customer.activate()
        }).toThrowError('Address is mandatory to activate a costumer')
    })

    it("should add reward points", () => {
        const customer = new Customer('1', 'Customer 1')
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardsPoints(10)
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardsPoints(10)
        expect(customer.rewardPoints).toBe(20)
    })
    
})