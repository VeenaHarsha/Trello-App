const router = require('express').Router()
const { getLists, addList } = require('../model/list-queries')

router.get('/:boardId', getLists)
router.post('/add', addList)

module.exports = router
