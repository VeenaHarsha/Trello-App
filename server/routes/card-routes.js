const router = require('express').Router()
const { getCards, addCard, updateCardPosition } = require('../model/card-queries')

router.get('/', getCards)
router.post('/add', addCard)
router.put('/updatePosition', updateCardPosition)

module.exports = router
