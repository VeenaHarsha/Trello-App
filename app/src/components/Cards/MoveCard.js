import React, { useState, useEffect, useReducer, useContext } from 'react'
import { StateContext } from '../../App'
import { initialState, cardReducer } from './CardReducer'

function MoveCard ({ card, list, lists, onMoveCard }) {
  const boardState = useContext(StateContext)
  const [state, dispatch] = useReducer(cardReducer, initialState)

  const [boardSelect, setBoardSelect] = useState(boardState.selBoard)
  const [listSelect, setListSelect] = useState(list.id)
  const [filtLists, setFiltLists] = useState([])

  useEffect(() => {
    getListOfSelBoard(boardSelect)
  }, [boardSelect, listSelect])

  const getListOfSelBoard = async (boardSelect) => {
    try {
      const response = await window.fetch(`http://localhost:2809/trello/list/${boardSelect}`)
      const data = await response.json()
      console.log('Warranttt..', data, boardSelect)
      setFiltLists(data)
      console.log('VV-- Warranty..', filtLists)
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const handleBoardSelChange = (e) => {
    setBoardSelect(e.target.value)
    // getListOfSelBoard(e.target.value)

    console.log('Checking newList: ', filtLists.length)
  }
  const handleListSelChange = (e) => {
    console.log('Checking what is in List:', list)
    setListSelect(e.target.value)
  }
  return (
    <>
      <div className='copy-card-editor-overlay'>
        <div className='copy-card-header'>
          <p className='copy-card-label'>Move Card</p>
          <span
            className='copy-card-close-overlay'
            onClick={(e) => { e.target.parentElement.parentElement.parentElement.style.display = 'none' }}
          >
            <img className='card-del-image' src={require('../../images/delete-60.png')} alt='Delete' />
          </span>
        </div>
        <form className='copy-op-form' onSubmit={(e) => { onMoveCard(e, card, boardSelect, listSelect) }}>
          <p className='copy-form-copy-to'>SELECT DESTINATION...</p>
          <div className='copy-form-select-board-div'>
            <span className='copy-form-board-inner-label'>Board</span>
            <div className='choose-board-input'>
              <select
                className='copy-form-board-desc'
                value={boardSelect}
                onChange={handleBoardSelChange}
              >
                <option value='0'> Select Board </option>
                {boardState.boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.board_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='copy-form-select-board-div'>
            <span className='copy-form-board-inner-label'>List</span>
            <div className='choose-board-input'>
              <select
                className='copy-form-board-desc'
                value={listSelect}
                onChange={handleListSelChange}
              >
                <option value='0'> Select List </option>
                {filtLists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.list_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='copy-form-select-board-div'>
            <span className='copy-form-board-inner-label'>Position</span>
            <div className='choose-board-input'>
              <select
                className='copy-form-board-desc'
              >
                {/* {filtLists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.list_name}
                  </option>
                ))} */}
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
              </select>
            </div>
          </div>
          <button
            type='submit'
            className='btn-update-card-details'
            // onClick={(e) => { onMoveCard(e, card, boardSelect, listSelect) }}
            onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}

          >
                    MOVE
          </button>
        </form>
      </div>
    </>
  )
}
export default MoveCard
