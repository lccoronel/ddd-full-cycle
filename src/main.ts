import { Order } from "./domain/entity/Order";
import { Address } from "./domain/entity/Address";
import { Customer } from "./domain/entity/Customer";
import { OrderItem } from "./domain/entity/OrderItem";

let customer = new Customer("123", "Lucas")
const address = new Address("Rua dois", 2, "12312312", "Sao Paulo")

customer.Address = address
customer.activate()

const item1 = new OrderItem("1", "item 1", 10, 0, "p1")
const item2 = new OrderItem("2", "item 2", 15, 1, "p2")

const  order = new Order("1", "123", [item1, item2])