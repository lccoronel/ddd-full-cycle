import { Product } from "./Product"

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() =>{
            let product = new Product("", "Name", 0)
        }).toThrowError("Id is required")
    })

    it("should throw error when name is empty", () => {
        expect(() =>{
            let product = new Product("123", "", 0)
        }).toThrowError("Name is required")
    })

    it("should throw error when price is less than 0", () => {
        expect(() =>{
            let product = new Product("123", "Name", -1)
        }).toThrowError("Price must be greater tha 0")
    })

    it("should change name", () => {
        const product = new Product("123", "Name", 100)
        product.changeName("Product name")

        expect(product.name).toBe("Product name")
    })

    it("should change price", () => {
        const product = new Product("123", "Name", 100)
        product.changePrice(150)
        
        expect(product.price).toBe(150)
    })
})