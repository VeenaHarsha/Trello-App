const { Pool } = require('pg')

const query = async (sql, params) => {
  try {
    return await pool.query(sql, params)
  } catch (err) {
    console.log(err)
  }
}
module.exports = { query }
