import React, { useEffect, useContext } from 'react'
import BoardsList from './BoardList'
import { StateContext, DispatchContext } from '../../App'

function Board () {
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  const { showAddBoard, showBoardList, boards, boardName } = state

  useEffect(() => {
    console.log('Board: Am from useEffect...')
    getBoards()
  }, [])

  const getBoards = async () => {
    const response = await window.fetch('http://localhost:2809/trello/board/')
    const data = await response.json()
    dispatch({ type: 'GET_BOARD_LIST', payLoad: data })
  }

  const submitBoard = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ board_name: boardName })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/board/add/', options)
      const data = await response.json()
      dispatch({ type: 'ADD_BOARD', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  return (
    <div className='container'>
      {showAddBoard &&
        <div className='board-div'>
          <form onSubmit={submitBoard}>
            <div className='add-board-form'>
              <input
                type='text'
                className='board-input'
                placeholder='Add Board..'
                value={boardName}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_BOARD_NAME',
                    fieldName: 'boardName',
                    payLoad: e.target.value
                  })}
              />
              <button
                type='button'
                className='close-board-button'
                onClick={() => dispatch({ type: 'HANDLE_ADD_BOARD' })}
              >
                Close
              </button>
            </div>
          </form>
        </div>}
      <div className='main-board-div'>
        {showBoardList && <BoardsList boards={boards} />}
        <div
          className='create-board-div'
          onClick={() => dispatch({ type: 'HANDLE_ADD_BOARD' })}
        >
            Create New Board
        </div>
      </div>
    </div>
  )
}
export default Board
