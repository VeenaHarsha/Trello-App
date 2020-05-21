const router = require('express').Router()

const boardRouter = require('./board-routes')
const listRouter = require('./list-routes')
const cardRouter = require('./card-routes')

router.use('/board', boardRouter)
router.use('/list', listRouter)
router.use('/card', cardRouter)

module.exports = router
