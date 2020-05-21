const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.APP_PORT || 3000
const app = express()
const routes = require('../server/routes/router')

app.use(express.json())
app.use(cors())

// ROUTES
app.use('/trello', routes)
app.get('/', (req, res) => {
  res.status(201).json({ message: 'Hello Vasista!!' })
})

app.listen(port, () => {
  console.log('App running on ', port)
})
