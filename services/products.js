const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

class ProductService {
    constructor() {
        this.products = []
        this.generateProducts()
    }
    generateProducts(limit = 20) {
        const products = [];
        for (let index = 1; index <= limit; index++) {
            products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.product(),
                price: parseFloat(faker.commerce.price()),
                image: faker.image.imageUrl(),
            })
        }
        this.products = products
    }
    async getProducts(limit) {
        // 3 + z
        // throw new Error("errorasdasd") //aca se captura con el try catch en las rutas
        return new Promise((res, rej) => {
            setTimeout(() => {

                // throw new Error("errorasdasd") //este no se capturaria, haria falta un try catch aca
                res(this.products.slice(0, limit))
            }, 2000)
        })

    }
    async getProductById(id) {
        const product = this.products.find((el) => el.id == id);
        if (product) {
            return product
        } else {
            return {
                error_message: "product not found"
            }
        }
    }
    async deleteProduct(id) {
        if (id) {
            const product_removed = this.getProductById(id);
            this.products = this.products.filter((el) => el.id != id)
            return {
                product_removed
            }
        } else {
            return {
                error_message: "product not found"
            }
        }
    }
    async updateProduct(id, productData) {
        if (id && productData) {
            let flag = false;
            let index = 0;
            while (!flag && index < this.products.length) {
                if (this.products[index].id == id) {
                    this.products[index] = {
                        ...this.products[index],
                        ...productData
                    };
                    // this.products[index].id = id;
                    flag = true
                }
                index++
            }
            if (flag) {
                return {
                    message: `product ${id} updated`,
                    productData: this.getProductById(id)
                }
            } else {
                return {
                    message: `we could not found product with id ${id}`
                }
            }
        } else {
            return {
                message: `there is nothing to update`,
            }
        }

    }
    async createProduct(productData) {
        if (!productData?.name) {
            return {
                message: "there is no data"
            }
        } else {
            //ADD ELEMENT
            const newProduct = {
                id: uuidv4(),
                ...productData
            }
            this.products = [...this.products, newProduct]
            return {
                newProduct: newProduct
            }
        }
    }
}
module.exports = {
    ProductService
}