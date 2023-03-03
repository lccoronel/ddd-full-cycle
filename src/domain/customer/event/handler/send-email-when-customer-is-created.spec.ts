import { EventDispatcher } from "../../../@shared/event/event-dispatcher";
import { Customer } from "../../entity/Customer";
import { Address } from "../../value-object/Address";
import { CustomerCreatedEvent } from "../customer-created.event";
import { SendEmailWhenCustomerIsCreatedHandler } from "./send-email-when-customer-is-created.handler";
import { SendEmailWhenCustomerIsCreatedHandler2 } from "./send-email-when-customer-is-created2.handler";

describe("Customer handler tests", () => {
    it('should notify when customer is created', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendEmailWhenCustomerIsCreatedHandler2();

        const spyEventHandler = jest.spyOn(eventHandler, "handle")
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle")

        eventDispatcher.register('CustomerCreatedEvent', eventHandler)
        eventDispatcher.register('CustomerCreatedEvent', eventHandler2)

        let customer = new Customer("123", "Lucas")
        const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")

        customer.Address = address

        const customerCreatedEvent = new CustomerCreatedEvent({ 
            name: "CustomerCreatedEvent", 
            customer,
        })

        eventDispatcher.notify(customerCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
        expect(spyEventHandler2).toHaveBeenCalled()
    })
})
