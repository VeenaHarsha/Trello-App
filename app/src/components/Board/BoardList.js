import React from 'react'
import BoardItem from './BoardItem'

function BoardsList ({ boards }) {
  return (
    <>
      {boards.map(board => (
        <BoardItem key={board.id} board={board} />
      ))}
    </>
  )
}

export default BoardsList
