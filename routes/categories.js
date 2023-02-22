const express = require('express');
const categories_router = express.Router()

categories_router.get('/', (req, res) => {
    try {
        res.json({ message: 'llegaste a las categories' })

    } catch (error) {
        console.error(error);
    }
})
module.exports = {
    categories_router
}