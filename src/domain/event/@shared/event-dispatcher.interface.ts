import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unresgister(eventName: string, eventHandler: EventHandlerInterface): void;
    unresgisterAll(): void;
}
