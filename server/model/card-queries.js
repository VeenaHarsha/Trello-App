const pool = require('./database')

const getCards = (req, res) => {
  console.log('AM IN GET CARDS: ', req.query)
  const boardId = req.query.boardId
  const listId = req.query.listId
  pool.query(`SELECT * FROM cards WHERE board_id = ${boardId} and list_id = ${listId} `, (error, result) => {
    if (error) {
      throw error
    }
    console.log('from cards:', result.rows)
    res.status(200).json(result.rows)
  })
}
const addCard = (req, res) => {
  const boardId = req.body.board_id
  const listId = req.body.list_id
  const cardDesc = req.body.card_desc
  console.log('Vasists:', boardId, listId, cardDesc)
  pool.query(`INSERT INTO cards (board_id,list_id,card_desc,is_archive) 
   values (${boardId},${listId},'${cardDesc}',false ) RETURNING *`, (error, result) => {
    if (error) {
      throw error
    }
    console.log('from cards:', result.rows)
    res.status(200).json(result.rows)
  })
}

module.exports = { getCards, addCard }
