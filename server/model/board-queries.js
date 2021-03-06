const pool = require('./database')

const getBoards = async (req, res) => {
  console.log('Am Inside Boards:', req.url)
  const result = await pool.query('SELECT * FROM board ORDER BY ID ASC')
  res.status(200).json(result.rows)
  console.log('Result is:', result)
  // , (error, result) => {
  //   if (error) {
  //     throw error
  //   }
  //   res.status(200).json(result.rows)
  // })
}
// prepared statement
const addBoard = (req, res) => {
  console.log('Am Inside Boards:', req.url)
  console.log('Am Inside Boards:', req.body)
  const boardName = req.body.board_name
  pool.query(`INSERT INTO board (board_name) values ('${boardName}') RETURNING *`, (error, result) => {
    if (error) {
      throw error
    }
    res.status(201).json({ message: 'Created Board', result: result.rows[0] })
  })
}

module.exports = { getBoards, addBoard }
