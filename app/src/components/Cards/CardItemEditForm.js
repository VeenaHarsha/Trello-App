import React, { useState, useReducer } from 'react'
import { initialState, cardReducer } from './CardReducer'
import CopyCard from './CopyCard'
import MoveCard from './MoveCard'

function CardItemEditForm ({ card, list, lists, onDeleteCard, onCardUpdate, onAddCard, onMoveCard }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { showOverlay, showCopyCardForm, showMoveCardForm } = state

  const [editTextArea, setEditTextArea] = useState(card.card_desc)

  const handleEditTextArea = (e) => {
    setEditTextArea(e.target.value)
  }
  return (
    <>
      <div className={`card-editor-overlay ${showOverlay ? 'hide' : 'show'}`}>
        <div
          className='close-overlay'
          // onClick={(e) => { e.target.parentElement.style.display = 'none' }}
          onClick={() => dispatch({ type: 'HANDLE_CLOSE_OVERLAY' })}
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
              <p
                className='card-label'
                onClick={() => dispatch({ type: 'HANDLE_MOVE_CARD_FORM' })}
              >
                    Move
              </p>
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
      </div>
      {showCopyCardForm &&
        <CopyCard
          card={card}
          list={list}
          lists={lists}
          onAddCard={onAddCard}
        />}
      {showMoveCardForm &&
        <MoveCard
          card={card}
          list={list}
          lists={lists}
          onAddCard={onAddCard}
          onMoveCard={onMoveCard}
        />}
    </>
  )
}

export default CardItemEditForm
