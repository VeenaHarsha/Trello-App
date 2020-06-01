import React, { useContext } from 'react'
import { StateContext, DispatchContext } from '../../App'
// import Lists from '../List/Lists'

function BoardItem ({ board }) {
  const dispatch = useContext(DispatchContext)
  // const state = useContext(StateContext)
  // const { showBoardList, showLists } = state

  return (
    <div
      className='board-display'
      onClick={() => dispatch({
        type: 'HANDLE_BOARD_CLICK',
        payLoad: { id: board.id, name: board.board_name }
      })}
    >
      {board.board_name} - {board.id}
    </div>
  )
}

// const showBoard = (id,name) => {
//   return {
//     type: 'handleBoarClick',
//     payLoad: { id, name}
//   }
// }

export default BoardItem
