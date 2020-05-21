import React, { useState, useEffect } from 'react'
import BoardItem from './BoardItem'

function Board () {
  const [showAddBoard, setShowAddBoard] = useState(false)
  const [showBoardList, setShowBoardList] = useState(true)
  const [boards, setBoards] = useState([{}])
  const [boardName, setBoardName] = useState('')

  useEffect(() => {
    console.log('Am from useEffect...')
    getBoards()
  }, [boardName])

  const getBoards = async () => {
    const response = await window.fetch('http://localhost:2809/trello/board/')
    console.log('Response:', response)
    const data = await response.json()
    setBoards(data)
  }

  const addBoard = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ board_name: boardName })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/board/add/', options)
      const data = await response.json()
      console.log('Data Is:', data)
      setBoards([...boards, { id: data.result.id, boardName: data.result.board_name }])
      setBoardName('')
      setShowAddBoard(false)
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  const handleInputChange = (event) => {
    setBoardName(event.target.value)
  }

  const handleClick = () => {
    setShowAddBoard(!showAddBoard)
  }

  const handleShowBoardList = (flag) => {
    setShowBoardList(flag)
  }

  return (
    <div className='container'>
      <div className='header'>
        <input
          className='board-search'
          type='text'
          placeholder='Search..'
        />
        {/* <span><img src={require('../images/search.png')} alt='search' /></span> */}
        <h2>Trello</h2>
        <button onClick={handleClick}>New Board</button>
      </div>
      {showAddBoard &&
        <div className='board-div'>
          <form onSubmit={addBoard}>
            <input
              type='text'
              className='board-input'
              placeholder='Add Board..'
              onChange={handleInputChange}
              value={boardName}
            />
          </form>
        </div>}

      <div className='body'>
        <div className='main-board-div'>
          {showBoardList &&
            <div>
              {boards.map(board => (
                <div key={board.id}>
                  <BoardItem
                    boardId={board.id}
                    boardName={board.board_name}
                    showBoards={handleShowBoardList}
                  />
                </div>
              ))}
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Board
