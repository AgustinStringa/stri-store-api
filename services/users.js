const faker = require('faker');
const { v4: uuidv4 } = require('uuid');
const boom = require('@hapi/boom');
class UserService {
    constructor() {
        this.users = this.generateUsers();
    }
    generateUsers() {
        const users = []
        for (let index = 0; index < 10; index++) {
            const element = {
                id: faker.datatype.uuid(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                jobArea: faker.name.jobArea(),
                avatar: faker.image.avatar(),
            };
            users.push(element);
        }
        return users;
    }
    async getUsers() {
        return new Promise((res, rej) => {
            res(this.users);
        })
    }
    async createUser(userData) {
        const newUser = {
            id: uuidv4(),
            ...userData
        }
        this.users = [...this.users, newUser]
        return {
            newUser
        }
    }
    async getUserById(id) {
        const users = this.users;
        const user = users.find((el) => el.id === id);
        if (!user) {
            throw boom.notFound(`User with id '${id}' Not Found :(`)
        } else {
            return user
        }
    }
    async updateUser(id, userData) {
        if (id && userData) {
            let flag = false;
            let index = 0;
            while (!flag && index < this.users.length) {
                if (this.users[index].id == id) {
                    this.users[index] = {
                        ...this.users[index],
                        ...userData
                    };
                    flag = true
                }
                index++
            }
            if (flag) {
                return {
                    message: `user id:'${id}' updated`,
                    userData: await this.getUserById(id)
                }
            } else {
                throw boom.notFound(`we could not found user with id ${id}`)
            }
        } else {
            throw boom.badRequest(`there is no data to update`)
        }
    }
    async deleteUser(id) {
        if (id) {
            try {
                const user_removed = await this.getUserById(id);
                this.users = this.users.filter((el) => el.id != id)
                return {
                    user_removed
                }
            } catch (error) {
                throw boom.notFound(`we could not found user with id: '${id}'`)
            }
        } else {
            throw boom.badRequest(`invalid url`)
        }
    }

}
module.exports = {
    UserService
}