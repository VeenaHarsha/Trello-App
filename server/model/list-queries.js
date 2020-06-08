const pool = require('./database')

const getLists = (req, res) => {
  const boardId = req.params.boardId
  pool.query(`SELECT * FROM lists where board_id = ${boardId} order by position`,
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    })
}
const addList = (req, res) => {
  const boardId = req.body.board_id
  const listName = req.body.list_name
  const position = req.body.position
  pool.query(`INSERT INTO lists (board_id, list_name, position) values (${boardId},'${listName}', ${position}) RETURNING *`,
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(201).json(result.rows[0])
    })
}
const updateListPosition = (req, res) => {
  const boardId = req.query.boardId
  const listId = req.query.listId
  const position = req.body.position
  pool.query(`UPDATE lists SET 
              position = '${position}', 
              board_id='${boardId}'
              where id = ${listId} RETURNING *`,
  (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}
module.exports = { getLists, addList, updateListPosition }
