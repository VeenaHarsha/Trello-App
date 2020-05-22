import React, { useEffect, useReducer, createContext } from 'react'
import BoardsList from './BoardsList'

function reducer (state, action) {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case 'getBoardList': {
      return {
        ...state,
        boards: state.boards.concat(action.payLoad)
      }
    }
    case 'addBoard': {
      return {
        ...state,
        boards: state.boards.concat(action.payLoad.result),
        boardName: '',
        showAddBoard: false
      }
    }
    case 'handleAddBoard': {
      return {
        ...state,
        showAddBoard: !state.showAddBoard
      }
    }
    case 'error': {
      return {
        ...state,
        'Error: ': action.payLoad
      }
    }
    case 'handleBoardClick': {
      return {
        ...state,
        showBoardList: false,
        showLists: true
      }
    }

    default: {
      return state
    }
  }
}

const initialState = {
  showAddBoard: false,
  showBoardList: true,
  showLists: false,
  boards: [],
  boardName: ''
}

export const StateContext = createContext()
export const DispatchContext = createContext()

function Board () {
  const [state, dispatch] = useReducer(reducer, initialState)
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
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
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
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
export default Board
