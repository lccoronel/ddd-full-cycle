import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface {
    notify(event: EventInterface): void {
        throw new Error("Method not implemented.");
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        throw new Error("Method not implemented.");
    }

    unresgister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        throw new Error("Method not implemented.");
    }
    
    unresgisterAll(): void {
        throw new Error("Method not implemented.");
    }

}