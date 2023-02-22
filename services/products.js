const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
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
                isBlock: faker.datatype.boolean(),
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
        const products = this.products;
        const product = products.find((el) => el.id == id);
        if (!product) {
            throw boom.notFound(`Product with id '${id}' Not Found :(`)
        } else if (product.isBlock) {
            throw boom.forbidden(`you cannot access to this product`)
        } else {
            return product
        }
    }
    async deleteProduct(id) {
        if (id) {
            try {
                const product_removed = await this.getProductById(id);
                this.products = this.products.filter((el) => el.id != id)
                return {
                    product_removed
                }
            } catch (error) {
                throw boom.notFound(`we could not found product with id ${id}`)
            }
        } else {
            throw boom.badRequest(`invalid url`)
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
                    productData: await this.getProductById(id)
                }
            } else {
                throw boom.notFound(`we could not found product with id ${id}`)
            }
        } else {
            throw boom.badRequest(`there is no data to update`)
        }

    }
    async createProduct(productData) {
        if (!productData?.name || !productData.price) {
            throw boom.badRequest("Invalid product");
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