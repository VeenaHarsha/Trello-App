import React, { createContext, useReducer } from 'react'
import './App.css'
import Nav from './Nav'
import Home from './Home'
import Templates from './Templates'
import Board from './components/Board/Board'
import Lists from './components/List/Lists'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { initialState, reducer } from '../src/components/Board/BoardReducer'

export const StateContext = createContext()
export const DispatchContext = createContext()

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className='App'>
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
