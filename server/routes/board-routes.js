const router = require('express').Router()
const boardQueries = require('../model/board-queries')

router.get('/', boardQueries.getBoards)
router.post('/add', boardQueries.addBoard)

module.exports = router
