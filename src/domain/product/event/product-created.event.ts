import { EventInterface } from "../../@shared/event/event.interface";

export class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventDate: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventDate = eventData;
    }
}
