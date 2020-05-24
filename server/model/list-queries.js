const pool = require('./database')

const getLists = (req, res) => {
  // console.log('Am in GetList:', req.params.boardId)
  const boardId = req.params.boardId
  pool.query(`SELECT * FROM lists where board_id = ${boardId}`,
    (error, result) => {
      if (error) {
        throw error
      }
      // console.log('Result is:', result)
      res.status(200).json(result.rows)
    })
}
const addList = (req, res) => {
  // console.log('Am in Add List:', req.url)
  const boardId = req.body.board_id
  const listName = req.body.list_name
  pool.query(`INSERT INTO lists (board_id, list_name) values (${boardId},'${listName}') RETURNING *`,
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).json(result.rows[0])
    })
}
module.exports = { getLists, addList }
