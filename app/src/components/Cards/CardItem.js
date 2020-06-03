import React from 'react'

function CardItem ({ card }) {
  const dragStartHandler = (e, card) => {
    console.log('Card is :', card)
    const cardObj = JSON.stringify(card)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('card', cardObj)
  }

  return (
    <>
      <div
        key={card.id}
        className='card-div'
        draggable
        onDragStart={(e) => dragStartHandler(e, card)}
      >
        <p>{card.card_desc}</p>
      </div>
    </>
  )
}
export default CardItem
