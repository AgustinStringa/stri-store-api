require('module-alias/register')
const express = require('express');
const categories_router = express.Router()
const { CategorieService } = require('@services/categories');
const {
    categorie_schema,
    update_categorie_schema,
    get_categorie_schema
} = require('@schemas/categories');
const { validatorHandler } = require('@middlewars/validator_handler');
categories_router.get('/', async (req, res, next) => {
    try {
        res.json({ message: 'llegaste a las categories' })
    } catch (error) {
        console.error(error);
    }
})
categories_router.get('/:id',
    validatorHandler(get_categorie_schema, "params"),
    async (req, res, next) => {
        try {
            res.json({ message: 'llegaste a las categories' })
        } catch (error) {
            console.error(error);
        }
    });

categories_router.post('/',
    validatorHandler(categorie_schema, "body"),
    async (req, res, next) => {
        try {
            res.json({ message: 'llegaste a las categories' })
        } catch (error) {
            console.error(error);
        }
    });
categories_router.patch('/',
    validatorHandler(update_categorie_schema, "body"),
    async (req, res, next) => {
        try {
            res.json({ message: 'llegaste a las categories' })
        } catch (error) {
            console.error(error);
        }
    });
categories_router.delete('/:id',
    validatorHandler(get_categorie_schema, "params"),
    async (req, res, next) => {
        try {
            res.json({ message: 'llegaste a las categories' })
        } catch (error) {
            console.error(error);
        }
    });

module.exports = {
    categories_router
}