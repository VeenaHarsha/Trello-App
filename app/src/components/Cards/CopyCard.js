import React, { useState, useEffect, useReducer, useContext } from 'react'
import { StateContext } from '../../App'
import { initialState, cardReducer } from './CardReducer'

function CopyCard ({ card, list, lists, onAddCard }) {
  const boardState = useContext(StateContext)
  const [state, dispatch] = useReducer(cardReducer, initialState)

  const [addTextArea, setAddTextArea] = useState(card.card_desc)
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
      // filtLists.push(...data)
      // filtLists.push({ id: 1, list_name: 'Veena' })
      console.log('VV-- Warranty..', filtLists)
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const handleChangeTextArea = (e) => {
    setAddTextArea(e.target.value)
  }
  const handleBoardSelChange = (e) => {
    setBoardSelect(e.target.value)
    // getListOfSelBoard(e.target.value)

    console.log('Checking newList: ', filtLists.length)
  }
  const handleListSelChange = (e) => {
    console.log('Checking what is in List:', listSelect, e.target.value)
    setListSelect(e.target.value)
  }
  return (
    <>
      <div className={`card-editor-overlay copy-card-editor-overlay ${state.showCopyCardForm ? 'hide' : 'show'}`}>
        <div className='copy-card-header'>
          <p className='copy-card-label'>Copy Card</p>
          <span
            className='copy-card-close-overlay'
            onClick={(e) => { e.target.parentElement.parentElement.parentElement.style.display = 'none' }}
          >
            <img className='card-del-image' src={require('../../images/delete-60.png')} alt='Delete' />
          </span>
        </div>
        <form className='copy-op-form' onSubmit={(e) => onAddCard(e, addTextArea, boardSelect, listSelect)}>
          <p className='copy-form-title'>Title</p>
          <textarea
            className='copy-form-desc'
            value={addTextArea}
            onChange={handleChangeTextArea}
          />
          <p className='copy-form-copy-to'>Copy to...</p>
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
          <button
            type='submit'
            className='btn-update-card-details'
            // onClick={(e) => { onAddCard(e, addTextArea, boardSelect, listSelect) }}
            onClick={() => dispatch({ type: 'HANDLE_COPY_CARD_FORM' })}
          >
                    Create Card
          </button>
        </form>
      </div>
    </>
  )
}
export default CopyCard
