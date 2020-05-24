import React from 'react'

function CardItem ({ card }) {
  return (
    <>
      <div key={card.id} className='card-div'>
        <p>{card.card_desc}</p>
      </div>
    </>
  )
}
export default CardItem
