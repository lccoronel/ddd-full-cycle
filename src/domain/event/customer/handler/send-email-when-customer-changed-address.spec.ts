import { Address } from "../../../entity/Address";
import { Customer } from "../../../entity/Customer";
import { EventDispatcher } from "../../@shared/event-dispatcher";
import { CustomerChangedAddressEvent } from "../customer-changed-address.event";
import { SendEmailWhenCustomerChangedAddressHandler } from "./send-email-when-customer-changed-address.handler";

describe("Customer handler tests", () => {
    it('should notify when customer changed address', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerChangedAddressHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        let customer = new Customer("123", "Lucas")
        const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")
        
        customer.Address = address

        const newAddress = new Address("Rua tres", 3, "123456", "Rio de janeiro")
        customer.changeAddress(newAddress)
        
        eventDispatcher.register('CustomerChangedAddressEvent', eventHandler)

        const customerCreatedEvent = new CustomerChangedAddressEvent({ 
            name: "CustomerChangedAddressEvent", 
            customer,
        })
        
        eventDispatcher.notify(customerCreatedEvent)


        expect(spyEventHandler).toHaveBeenCalled()
    })
})
