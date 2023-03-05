import { Address } from "../value-object/Address"
import { CustomerFactory } from "./customer.factory"



describe('Customer factory unit tests', () => {
    it('should create a customer tyoe a', () => {
        const customer = CustomerFactory.create("John")

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeUndefined()
        expect(customer.constructor.name).toBe("Customer")
    })

    it('should create a customer with an address', () => {
        const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")
        const customer = CustomerFactory.createWithAddress("John", address)

        expect(customer.id).toBeDefined()
        expect(customer.name).toBe("John")
        expect(customer.Address).toBeDefined()
        expect(customer.constructor.name).toBe("Customer")
    })
})
