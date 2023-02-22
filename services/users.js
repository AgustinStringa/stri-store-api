const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
class UserServices {
    constructor() {
        this.users = this.generateUsers();
    }
    generateUsers() {
        return []
    }
    async getUsers() { }
    async createUser() { }
    async getUserById(id) { }
    async updateUser(id, newData) { }
    async deleteUser(id) { }

}
module.exports = {
    UserServices
}