const pool = require('./database')

const getCards = (req, res) => {
  const boardId = req.query.boardId
  const listId = req.query.listId
  pool.query(`SELECT * FROM cards WHERE board_id = ${boardId} and list_id = ${listId} order by position `, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}
const addCard = (req, res) => {
  const boardId = req.body.board_id
  const listId = req.body.list_id
  const cardDesc = req.body.card_desc
  pool.query(`INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
   values (${boardId},${listId},'${cardDesc}',false ) RETURNING *`, (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}
const updateCardPosition = (req, res) => {
  const cardId = req.query.cardId
  const listId = req.query.listId
  const position = req.body.position
  pool.query(`UPDATE cards SET 
              position = '${position}', 
              list_id='${listId}'
              where id = ${cardId} RETURNING *`,
  (error, result) => {
    if (error) {
      throw error
    }
    res.status(200).json(result.rows)
  })
}
module.exports = { getCards, addCard, updateCardPosition }
