import React, { useEffect, useContext } from 'react'
import BoardsList from './BoardList'
import { StateContext, DispatchContext } from '../../App'

function Board () {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const dispatch = useContext(DispatchContext)
  const state = useContext(StateContext)
  const { showAddBoard, showBoardList, boards, boardName } = state

  useEffect(() => {
    console.log('Am from useEffect...')
    getBoards()
  }, [])

  const getBoards = async () => {
    const response = await window.fetch('http://localhost:2809/trello/board/')
    const data = await response.json()
    dispatch({ type: 'getBoardList', payLoad: data })
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
      dispatch({ type: 'addBoard', payLoad: data })
    } catch (err) {
      dispatch({ type: 'error', payLoad: err })
    }
  }
  return (
    <div className='container'>
      <div className='header'>
        <input
          className='board-search'
          type='text'
          placeholder='Search..'
        />
        <h2>Trello</h2>
        <button
          onClick={() => dispatch({ type: 'handleAddBoard' })}
        >
            New Board
        </button>
      </div>
      {showAddBoard &&
        <div className='board-div'>
          <form onSubmit={submitBoard}>
            <input
              type='text'
              className='board-input'
              placeholder='Add Board..'
              value={boardName}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'boardName',
                  payLoad: e.target.value
                })}
            />
          </form>
        </div>}
      <>
        <div className='main-board-div'>
          {showBoardList && <BoardsList boards={boards} />}
        </div>
      </>
    </div>
  )
}
export default Board
