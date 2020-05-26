import React, { useContext } from 'react'
import CardItem from './CardItem'
import { StateContext } from '../../App'
import { ListStateContext, ListDispatchContext } from '../List/ListItem'

function Cards ({ list }) {
  const boardState = useContext(StateContext)
  const { selBoard } = boardState

  const listState = useContext(ListStateContext)
  const listDispatch = useContext(ListDispatchContext)
  const { cards, showCardInput, cardTitle } = listState

  const submitCard = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ board_id: selBoard, list_id: list.id, card_desc: cardTitle, is_archive: false })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/card/add', options)
      const data = await response.json()
      listDispatch({ type: 'addCard', payLoad: data })
    } catch (err) {
      listDispatch({ type: 'error', payLoad: err })
    }
  }

  return (
    <div className='card-container'>
      <div>
        {cards.map(card => (
          <CardItem key={card.id} card={card} />
        // <li key={card.id}>{card.card_desc}</li>
        ))}
      </div>
      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={() => listDispatch({ type: 'handleCardClick' })}
          >
                  Add a Card
          </a>
          </div> : null}
      {showCardInput
        ? <div>
          <form className='card-form' onSubmit={submitCard}>
            <textarea
              type='text'
              className='card-text-input'
              placeholder='Enter title for this card..'
              value={cardTitle}
              // onChange={handleCardInput}
              onChange={(e) =>
                listDispatch({
                  type: 'field',
                  fieldName: 'cardTitle',
                  payLoad: e.target.value
                })}
            />
            <button className='add-card-btn'>Add Card</button>
            <span className='X-image'>X</span>
          </form>
          </div> : null}

    </div>
  )
}
export default Cards