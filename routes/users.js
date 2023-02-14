const express = require('express');
const faker = require('faker');
const users_router = express.Router()
users_router.get('/', function (req, res) {
    const limit = req.query.limit || 10;
    const users = [];
    for (let index = 1; index <= limit; index++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            card: faker.helpers.createCard(),
        })
    }
    res.json(users);
});
users_router.post('/', function (req, res) {

    let message = ""
    if (req.body.name) {
        res.status(200);
        message = "successfully created"
    } else {
        res.status(204);
        message = "error on create"
    }
    res.json({ message });
});

module.exports = { route_name: 'users', router: users_router };