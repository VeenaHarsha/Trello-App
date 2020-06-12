import React, { useReducer, useState } from 'react'
import { initialState, cardReducer } from './CardReducer'
import CopyCard from './CopyCard'

function CardItem ({ card, list, lists, onDeleteCard, onCardUpdate, onAddCard }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { cards, showCardEdit, showCopyCardForm, showOverlay } = state
  const [editTextArea, setEditTextArea] = useState(card.card_desc)

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
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    // e.currentTarget.style.background = 'white'
    e.currentTarget.style.border = 'none'
  }

  const handleEditTextArea = (e) => {
    setEditTextArea(e.target.value)
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
        <p
          className='card-desc'
        >
          {cards.length ? cards[0].card_desc : card.card_desc}
        </p>
        <span
          type='submit'
          onClick={() => dispatch({ type: 'HANDLE_EDIT_CARD' })}
        >
          <img className='card-edit-image' src={require('../../images/edit.png')} alt='Edit' />
        </span>
      </div>
      {showCardEdit &&
        <div id='overlay-id' className={`card-editor-overlay ${showOverlay ? 'show' : ''}`}>
          <div
            className='close-overlay'
            onClick={(e) => { e.target.parentElement.style.display = 'none' }}
          >
            CLOSE
          </div>
          <div className='card-editor'>
            <form className='card-edit-div'>
              <div>
                <textarea
                  className='edit-card-name'
                  value={editTextArea}
                  onChange={handleEditTextArea}
                />
              </div>
              <button
                className='save-card-name'
                type='submit'
                onClick={(e) => { onCardUpdate(e, card.id, editTextArea, card) }}
              >
                Save
              </button>
            </form>
            <div className='card-ops-div'>
              <form className='card-ops-a-tag'>
                <img className='card-image' src={require('../../images/copy.png')} alt='Copy' />
                <p
                  className='card-label'
                  onClick={() => dispatch({ type: 'HANDLE_COPY_CARD_FORM' })}
                >
                      Copy
                </p>
              </form>
              <form className='card-ops-a-tag'>
                <img className='card-image' src={require('../../images/move.png')} alt='Move' />
                <p className='card-label'>Move</p>
              </form>
              <form className='card-ops-a-tag'>
                <img className='card-image' src={require('../../images/clock.png')} alt='Move' />
                <p className='card-label'>Change Due Date</p>
              </form>
              <form className='card-ops-a-tag'>
                <img className='card-image' src={require('../../images/delete-52.png')} alt='Delete' />
                <p
                  className='card-label'
                  onClick={(e) => { onDeleteCard(e, card.id) }}
                >
                    Delete
                </p>
              </form>
            </div>
          </div>
        </div>}
      {showCopyCardForm &&
        <CopyCard
          card={card}
          list={list}
          lists={lists}
          onAddCard={onAddCard}
        />}
    </>
  )
}
export default CardItem
