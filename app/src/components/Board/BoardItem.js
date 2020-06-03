import React, { useContext } from 'react'
import { DispatchContext } from '../../App'

function BoardItem ({ board }) {
  const dispatch = useContext(DispatchContext)
  return (
    <>
      <div
        className='board-display'
        onClick={() => dispatch({
          type: 'HANDLE_BOARD_CLICK',
          payLoad: { id: board.id, name: board.board_name }
        })}
      >
        {board.board_name} - {board.id}
      </div>
    </>
  )
}
export default BoardItem
