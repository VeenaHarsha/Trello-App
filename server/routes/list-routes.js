const router = require('express').Router()
const { getLists, addList, updateListPosition } = require('../model/list-queries')

router.get('/:boardId', getLists)
router.post('/add', addList)
router.put('/updateListPosition', updateListPosition)

module.exports = router
