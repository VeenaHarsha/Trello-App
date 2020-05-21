const router = require('express').Router()
const listQueries = require('../model/list-queries')

router.get('/', listQueries.getLists)
router.post('/add', listQueries.addList)

module.exports = router
