require('module-alias/register')
const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
const { validatorHandler } = require('@middlewars/validator_handler');
class CategoryService {
    constructor() {
        this.categories = this.generateCategories();
    }
    generateCategories() {
        const categories = ["clothes", "toys"]
        return categories;
    }
    async getCategories() {
        return new Promise((res, rej) => {
            res(this.categories);
        })
    }
    async createCategorie(categorieData) {
        return {

        }
    }
    async getCategorieById(id) {
        const categorie = {};
        if (!categorie) {
            throw boom.notFound(`Categorie with id '${id}' Not Found :(`)
        } else {
            return categorie
        }
    }
    async updateCategorie(id, categorieData) {
        if (id && categorieData) {
            let flag = false;
            let index = 0;
            while (!flag && index < this.categories.length) {
                if (this.categories[index].id == id) {
                    this.categories[index] = {
                        ...this.categories[index],
                        ...categorieData
                    };
                    flag = true
                }
                index++
            }
            if (flag) {
                return {
                    message: `categorie id:'${id}' updated`,
                    categorieData: await this.getCategorieById(id)
                }
            } else {
                throw boom.notFound(`we could not found categorie with id ${id}`)
            }
        } else {
            throw boom.badRequest(`there is no data to update`)
        }
    }
    async deleteCategorie(id) {
        if (id) {
            try {
                const categorie_removed = await this.getCategorieById(id);
                this.categories = this.categories.filter((el) => el.id != id)
                return {
                    categorie_removed
                }
            } catch (error) {
                throw boom.notFound(`we could not found categorie with id: '${id}'`)
            }
        } else {
            throw boom.badRequest(`invalid url`)
        }
    }

}
module.exports = {
    CategoryService
}