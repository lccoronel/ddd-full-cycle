import { Address } from "../../../entity/Address";
import { Customer } from "../../../entity/Customer";
import { EventDispatcher } from "../../@shared/event-dispatcher";
import { CustomerCreatedEvent } from "../customer-created.event";
import { SendEmailWhenCustomerIsCreatedHandler } from "./send-email-when-customer-is-created.handler";

describe("Customer handler tests", () => {
    it('should notify when customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register('CustomerCreatedEvent', eventHandler)

        let customer = new Customer("123", "Lucas")
        const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")

        customer.Address = address

        const customerCreatedEvent = new CustomerCreatedEvent({ 
            name: "CustomerCreatedEvent", 
            customer,
        })

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})
