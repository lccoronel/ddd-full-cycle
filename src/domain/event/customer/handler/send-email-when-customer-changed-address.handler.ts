import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerChangedAddressEvent } from "../customer-changed-address.event";

export class SendEmailWhenCustomerChangedAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
    handle(event: CustomerChangedAddressEvent): void {
        const { Address, id, name } = event.eventDate.customer
        const address = `${Address.street}, ${Address.city}`

        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
} 
