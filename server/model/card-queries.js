const pool = require('./database')

const getCards = (req, res) => {
  const listId = req.params.id
  // const { boardId } = req.body
  pool.query(`SELECT * FROM cards WHERE list_id = ${listId}`, (error, result) => {
    if (error) {
      throw error
    }
    console.log('from cards:', result.rows)
    res.status(200).json(result.rows)
  })
}

module.exports = { getCards }
