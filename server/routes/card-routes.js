const router = require('express').Router()
const cardQueries = require('../model/card-queries')

router.get('/', cardQueries.getCards)
router.post('/add', cardQueries.addCard)

module.exports = router
