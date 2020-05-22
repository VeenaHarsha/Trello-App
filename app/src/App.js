import React from 'react'
import './App.css'
import Board from './components/Board'

function App () {
  return (
    <div className='App'>
      <Board />
      <Lists />
    </div>
  )
}
function Lists () {
  return (
    <h1>List Goes Here...</h1>
  )
}

export default App
