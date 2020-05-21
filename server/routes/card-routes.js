const router = require('express').Router()
const cardQueries = require('../model/card-queries')

router.get('/', cardQueries.getCards)

module.exports = router
