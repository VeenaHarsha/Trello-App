import React from 'react'

function CardItem ({ card }) {
  const dragStartHandler = (e, id) => {
    e.dataTransfer.setData('id', id)
  }

  return (
    <>
      <div
        key={card.id}
        className='card-div'
        draggable
        onDragStart={(e) => dragStartHandler(e, card.id)}
      >
        <p>{card.card_desc}</p>
      </div>
    </>
  )
}
export default CardItem
