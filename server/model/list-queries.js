const pool = require('./database')

const getLists = (req, res) => {
  const boardId = req.body.id
  pool.query(`SELECT * FROM lists where board_id = ${boardId}`,
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    })
}
const addList = (req, res) => {
  console.log('Am in Add List:', req.body)
  const boardId = req.body.id
  const listName = req.body.listName
  pool.query(`INSERT INTO lists (board_id, list_name) values (${boardId},'${listName}') RETURNING *`,
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).json({ message: 'Created List', result: result.rows[0] })
    })
}
module.exports = { getLists, addList }
