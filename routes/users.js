require('module-alias/register')
const express = require('express');
const users_router = express.Router()
const { UserService } = require('@services/users.js'); //class
const user_service = new UserService();
const { validatorHandler } = require('@middlewars/validator_handler');
const { user_schema, update_user_schema, get_user_schema } = require('@schemas/users');
users_router.get('/', async function (req, res, next) {
    try {
        const users = await user_service.getUsers();
        res.status(200).json({ length: users.length, users });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

users_router.get('/:id',
    validatorHandler(get_user_schema, 'params'),
    async function (req, res, next) {
        try {
            const { id } = req.params;
            const user = await user_service.getUserById(id);
            res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });

users_router.post('/', async function (req, res, next) {
    try {
        const newUser = await user_service.createUser(req.body);
        res.status(201).json({ newUser });
    } catch (error) {
        console.error(error);
        next(error);
    }
});
users_router.patch('/:id',
    validatorHandler(get_user_schema, "params"),
    validatorHandler(update_user_schema, "body"),
    async function (req, res, next) {
        try {
            //TODO- HACER MODELO-VALIDAR DATOS
            const { id } = req.params;
            const updatedUser = await user_service.updateUser(id, req.body);
            res.json({
                updatedUser
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
users_router.delete('/:id',
    validatorHandler(get_user_schema, "params"),
    async function (req, res, next) {
        try {
            const { id } = req.params;
            const deletedUser = await user_service.deleteUser(id);
            res.json({ deletedUser: deletedUser });
        } catch (error) {
            console.error(error);
            next(error);
        }
    });
module.exports = { users_router };