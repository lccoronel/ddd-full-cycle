import { Sequelize } from "sequelize-typescript";
import { Order } from "../../domain/checkout/entity/Order";
import { OrderItem } from "../../domain/checkout/entity/OrderItem";
import { Customer } from "../../domain/customer/entity/Customer";
import { Address } from "../../domain/customer/value-object/Address";
import { Product } from "../../domain/product/entity/Product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Customer repository test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });

    it('should be find all orders',async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("rua 1", 1, "zipcode", "city")

      customer.changeAddress(address)
      await customerRepository.create(customer)

      const productRepository = new ProductRepository()
      const product = new Product("123", "product 1", 10)

      await productRepository.create(product)

      const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)
      const order = new Order("123", customer.id, [orderItem])

      const orderRepository = new OrderRepository()
      await orderRepository.create(order)
      const orderModels = await orderRepository.findAll()

      expect(orderModels).toHaveLength(1);
      expect(orderModels).toContainEqual(order);
    })

    it('should be find an order by id', async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("rua 1", 1, "zipcode", "city")

      customer.changeAddress(address)
      await customerRepository.create(customer)

      const productRepository = new ProductRepository()
      const product = new Product("123", "product 1", 10)

      await productRepository.create(product)

      const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)
      const order = new Order("123", customer.id, [orderItem])

      const orderRepository = new OrderRepository()
      await orderRepository.create(order)
      const orderModel = await orderRepository.find("123")

      
    })

    it('should be update an order', async () => {
      const customerRepository = new CustomerRepository()
      const customer = new Customer("123", "Customer 1")
      const address = new Address("rua 1", 1, "zipcode", "city")

      customer.changeAddress(address)
      await customerRepository.create(customer)

      const productRepository = new ProductRepository()
      const product = new Product("123", "product 1", 10)

      await productRepository.create(product)

      const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)
      const order = new Order("123", customer.id, [orderItem])

      const orderRepository = new OrderRepository()
      await orderRepository.create(order)

      const orderItem2 = new OrderItem("2", product.name, product.price, 3, product.id)

      order.addOrderItem(orderItem2)
      await orderRepository.update(order)

      const orderModel = await OrderModel.findOne({
        where: { id: order.id },
        include: ["items"]
      })
      
      expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: customer.id,
        total: order.total(),
        items: [{
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }, {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "123"
        }]
      })
    })

    it('should create a new order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer("123", "Customer 1")
        const address = new Address("rua 1", 1, "zipcode", "city")

        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product("123", "product 1", 10)

        await productRepository.create(product)

        const orderItem = new OrderItem("1", product.name, product.price, 2, product.id)
        const order = new Order("123", customer.id, [orderItem])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: customer.id,
            total: order.total(),
            items: [{
                id: orderItem.id,
                name: orderItem.name,
                price: orderItem.price,
                quantity: orderItem.quantity,
                order_id: "123",
                product_id: "123"
            }]
        })
    })
})