import React, { useReducer } from 'react'
import { initialState, cardReducer } from './CardReducer'
import CardItemEditForm from './CardItemEditForm'

function CardItem ({ card, list, lists, onDeleteCard, onCardUpdate, onAddCard, onMoveCard }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const { cards, showCardEdit } = state

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
        <CardItemEditForm
          card={card}
          list={list}
          lists={lists}
          onDeleteCard={onDeleteCard}
          onCardUpdate={onCardUpdate}
          onAddCard={onAddCard}
          onMoveCard={onMoveCard}
        />}
    </>
  )
}
export default CardItem
