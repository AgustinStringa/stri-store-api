require('module-alias/register')
const express = require('express');
const users_router = express.Router()
const { UserServices } = require('@services/users.js'); //class
users_router.get('/', async function (req, res, next) {
    try {
        const users = [];
        res.status(200).json({ users });

    } catch (error) {
        console.error(error);
        next(error);
    }
});
users_router.post('/', async function (req, res, next) {
    try {
        const newUser = {};
        res.status(201).json({ newUser });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
users_router.patch('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        //TODO- HACER MODELO-VALIDAR DATOS
        const updatedUser = {
            id: id,
            name: '',
            surname: '',
            email: '',
        }
        res.json({
            updatedUser
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
});
users_router.delete('/:id',
    async function (req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = {};
            res.json({ deletedUser: deletedUser });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
module.exports = { users_router };