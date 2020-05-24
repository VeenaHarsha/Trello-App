import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../../App'

function BoardItem ({ board }) {
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  return (
    <div
      className='board-display'
      onClick={() => dispatch({
        type: 'handleBoardClick',
        payLoad: { id: board.id, name: board.board_name }
      })}
    >
      {board.board_name} - {board.id}
    </div>
  )
}

export default BoardItem
