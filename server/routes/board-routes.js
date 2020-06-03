const router = require('express').Router()
const { getBoards, addBoard } = require('../model/board-queries')

router.get('/', getBoards)
router.post('/add', addBoard)

module.exports = router
