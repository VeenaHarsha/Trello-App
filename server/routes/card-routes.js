const router = require('express').Router()
const { getCards, addCard, updateCardPosition, deleteCard } = require('../model/card-queries')

router.get('/', getCards)
router.post('/add', addCard)
router.delete('/delete/:id', deleteCard)
router.put('/updatePosition', updateCardPosition)

module.exports = router
