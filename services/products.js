const faker = require('faker');
// const createProduct = (productData) => {

// }

// const getProducts = (limit) => {
//     const products = [];
//     for (let index = 1; index <= limit; index++) {
//         products.push({
//             name: faker.commerce.product(),
//             price: parseFloat(faker.commerce.price()),
//             image: faker.image.imageUrl(),
//         })
//     }
//     return products
// }
// const getProductBy = () => { }
// const updateProduct = () => { }
// const deleteProduct = () => { }


// module.exports = {
//     getProducts: getProducts,
// }

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
    getProducts(limit) {
        return this.products.slice(0, limit)
    }
    getProductById(id) {
        const product = this.products.find((el) => el.id == id);
        if (product) {
            return product
        } else {
            return {
                error_message: "product not found"
            }
        }
    }
    deleteProduct(id) {
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
    updateProduct(id, productData) {
        if (id && productData) {
            let flag = false;
            let index = 0;
            while (!flag && index < this.products.length) {
                if (this.products[index].id == id) {
                    this.products[index] = productData;
                    this.products[index].id = id;
                    flag = true
                }
                index++
            }
            return {
                message: `product ${id} updated`,
                productData: this.getProductById(id)
            }
        } else {
            return {
                message: `there is nothing to update`,
            }
        }

    }
}
module.exports = {
    ProductService
}