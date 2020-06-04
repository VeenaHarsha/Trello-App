import React from 'react'

function CardItem ({ card }) {
  const handleDragStart = (e, card) => {
    console.log('Card is :', card)
    // dragSrcEl = e.target
    e.target.style.opacity = '0.4'
    const cardObj = JSON.stringify(card)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('card', cardObj)
  }
  const handleDragOver = (e) => {
    e.preventDefault() // Necessary. Allows us to drop.
    e.currentTarget.style.background = 'yellow'
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    e.currentTarget.style.background = 'yellow'
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    e.currentTarget.style.background = 'white'
    e.currentTarget.style.border = 'none'
  }
  return (
    <>
      <div
        key={card.id}
        className='card-div'
        draggable
        onDragStart={(e) => handleDragStart(e, card)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <p>{card.card_desc}</p>
      </div>
    </>
  )
}
export default CardItem
