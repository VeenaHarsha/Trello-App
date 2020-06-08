import React, { useState, useContext, useReducer } from 'react'
import { StateContext } from '../../App'
import { initialState, cardReducer } from './CardReducer'

function CardItem ({ card }) {
  const [showCardEdit, setShowCardEdit] = useState(false)
  const [showCopyCardScreen, setShowCopyCardScreen] = useState(false)
  const [showChooseBoard, setShowChooseBoard] = useState(false)
  const [showChooseList, setShowChooseList] = useState(false)
  const [state, dispatch] = useReducer(cardReducer, initialState)

  const boardState = useContext(StateContext)

  const handleDragStart = (e, card) => {
    console.log('Card is :', card)
    e.target.style.opacity = '0.4'
    const cardObj = JSON.stringify(card)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('card', cardObj)
  }
  const handleDragEnd = (e) => {
    e.target.style.opacity = ''
    e.currentTarget.style.border = ''
    // e.currentTarget.style.background = 'white'
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    // e.currentTarget.style.background = 'yellow'
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    // e.currentTarget.style.background = 'yellow'
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    // e.currentTarget.style.background = 'white'
    e.currentTarget.style.border = 'none'
  }
  const handleEditClick = (e) => {
    setShowCardEdit(!showCardEdit)
  }
  const handleCopyCard = (e) => {
    setShowCopyCardScreen(!showCopyCardScreen)
  }
  const handleSelectBoardName = (e) => {
    setShowChooseBoard(!showChooseBoard)
  }
  const handleSelectListName = (e) => {
    setShowChooseList(!showChooseList)
  }
  const handleDeleteCard = async (id) => {
    const options = { method: 'DELETE' }
    try {
      const respone = await window.fetch(`http://localhost:2809/trello/card/delete/${id}`, options)
      await respone.json()
      const newCardsList = state.cards.filter(card => card.id !== id)
      dispatch({ type: 'DELETE_CARD', newCardsList })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const handleCardName = (e) => {
    console.log('Text Area: ', e.target)
  }
  return (
    <>
      <div
        key={card.id}
        className='card-div'
        draggable
        onDragStart={(e) => handleDragStart(e, card)}
        onDragEnd={(e) => handleDragEnd(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <p className='card-desc'>{card.card_desc}</p>
        <span
          type='submit'
          className='del-btn'
          onClick={handleEditClick}
        >
          <img className='card-edit-image' src={require('../../images/edit.png')} alt='Edit' />
        </span>
      </div>
      {showCardEdit &&
        <div className='card-editor-overlay' style={{ display: 'block' }}>
          <span
            className='close-overlay'
            onClick={(e) => { e.target.parentElement.style.display = 'none' }}
          >
            CLOSE
          </span>
          <div className='card-editor'>
            <div className='card-edit-div'>
              <textarea
                className='edit-card-name'
                rows='5'
                cols='25'
                value={card.card_desc}
                onChange={handleCardName}
              />
            </div>
            <div className='card-ops-div'>
              <a className='card-ops-a-tag' href='#' onClick={handleCopyCard}>
                <img className='card-image' src={require('../../images/copy.png')} alt='Copy' />
                <p className='card-label'>Copy</p>
              </a>
              <a className='card-ops-a-tag' href='#'>
                <img className='card-image' src={require('../../images/move.png')} alt='Move' />
                <p className='card-label'>Move</p>
              </a>
              <a className='card-ops-a-tag' href='#'>
                <img className='card-image' src={require('../../images/clock.png')} alt='Move' />
                <p className='card-label'>Change Due Date</p>
              </a>
              <a className='card-ops-a-tag' href='#'>
                <img className='card-image' src={require('../../images/delete-52.png')} alt='Delete' />
                <p
                  className='card-label'
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </p>
              </a>
            </div>
          </div>
        </div>}
      {showCopyCardScreen &&
        <div
          className='copy-card-editor-overlay'
          style={{ display: 'block' }}
        >
          <div className='copy-card-header'>
            <p className='copy-card-label'>Copy Card</p>
            <span
              className='copy-card-close-overlay'
              onClick={(e) => { e.target.parentElement.parentElement.parentElement.style.display = 'none' }}
            >
              <img className='card-del-image' src={require('../../images/delete-60.png')} alt='Delete' />
            </span>
          </div>
          <form className='copy-op-form'>
            <p className='copy-form-title'>Title</p>
            <textarea
              className='copy-form-desc'
              rows='5'
              cols='30'
            >
              {card.card_desc}
            </textarea>
            <p className='copy-form-copy-to'>Copy to...</p>
            <div className='copy-form-select-board-div'>
              <span className='copy-form-board-inner-label'>Board</span>
              <input
                className='choose-board-input'
                type='text'
                placeholder='Select Board'
                onClick={handleSelectBoardName}
              />
              {showChooseBoard &&
                <ul
                  className='copy-form-boards-list'
                  style={{ display: 'block', border: 'none' }}
                >
                  {boardState.boards.map(board => (
                    <p
                      className='copy-form-board-desc'
                      key={board.id}
                    >
                      {board.board_name}
                    </p>
                  ))}
                </ul>}
            </div>
            <div className='copy-form-select-board-div'>
              <span className='copy-form-board-inner-label'>List</span>
              <input
                className='choose-board-input'
                type='text'
                placeholder='Select List'
                onClick={handleSelectListName}
              />
              {showChooseList &&
                <ul
                  className='copy-form-boards-list'
                  style={{ display: 'block', border: 'none' }}
                >
                  <p
                    className='copy-form-board-desc'
                  >
                    {card.list_id}
                  </p>
                </ul>}
            </div>
            <button
              type='submit'
              className='btn-update-card-details'
            >
                Create Card
            </button>
          </form>
        </div>}
    </>
  )
}
export default CardItem
