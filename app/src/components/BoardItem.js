import React, { useContext } from 'react'
// import Lists from './Lists'
import { StateContext, DispatchContext } from './Board'

function BoardItem ({ board }) {
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  return (
    <div
      className='board-display'
      onClick={() => dispatch({ type: 'handleBoardClick' })}
    >
      {board.board_name}
    </div>
  )
}

export default BoardItem
