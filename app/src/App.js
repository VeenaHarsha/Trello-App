import React, { createContext, useReducer } from 'react'
import './App.css'
import Nav from './Nav'
import Home from './Home'
import Templates from './Templates'
import Board from './components/Board/Board'
import Lists from './components/List/Lists'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GET_BOARD_LIST, SET_BOARD_NAME, ADD_BOARD, HANDLE_ADD_BOARD, HANDLE_BOARD_CLICK } from './actionType'

export const StateContext = createContext()
export const DispatchContext = createContext()

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD_NAME: {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case GET_BOARD_LIST: {
      console.log('From getBoardList: ', action.payLoad)
      return {
        ...state,
        boards: action.payLoad
      }
    }
    case ADD_BOARD : {
      return {
        ...state,
        boards: state.boards.concat(action.payLoad.result),
        boardName: '',
        showAddBoard: false
      }
    }
    case HANDLE_ADD_BOARD: {
      return {
        ...state,
        showAddBoard: !state.showAddBoard
      }
    }
    case 'ERROR': {
      return {
        ...state,
        'Error: ': action.payLoad
      }
    }
    case HANDLE_BOARD_CLICK : {
      console.log('Board Clicked:', action.payLoad)
      return {
        ...state,
        showBoardList: false,
        showNav: false,
        showLists: true,
        selBoard: action.payLoad.id,
        selBoardName: action.payLoad.name
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
  showNav: true,
  showLists: false,
  boards: [],
  boardName: '',
  selBoard: '',
  selBoardName: ''
}
function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className='App'>
          {/* <Board /> */}
          {/* {state.showLists && <Lists />} */}
          <div className='header'>
            <input
              className='board-search'
              type='text'
              placeholder='Search..'
            />
            <h2>wOrK iN pRoGrEsS</h2>
            <span
              className='btn-add-board'
              onClick={() => dispatch({ type: 'handleAddBoard' })}
            >
            +
            </span>
          </div>
          {state.showNav &&
            <div className='main-content'>
              <Router>
                <Nav />
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/boards' component={Board} />
                  <Route path='/templates' component={Templates} />
                </Switch>
              </Router>
            </div>}
          {state.showLists && <Lists />}

        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default App
