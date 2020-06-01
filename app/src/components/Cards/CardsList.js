import React, { useContext } from 'react'
import CardItem from './CardItem'
import { StateContext } from '../../App'
import { ListStateContext, ListDispatchContext } from '../List/ListItem'

function CardsList ({ list }) {
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
      listDispatch({ type: 'ADD_CARD', payLoad: data })
    } catch (err) {
      listDispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const handleDragover = (e) => {
    e.preventDefault()
  }
  const handleDrop = (e) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('id')
    const target = e.target.parentElement.parentElement
    console.log('Being Dragged:', document.getElementById(id).firstElementChild, e.target.parentElement)
    target.appendChild(document.getElementById(id))
    // e.dataTransfer.clearData()
  }
  return (
    <div className='card-container'>
      {cards.map((card) => (
        <div
          id={card.id}
          key={card.id}
          className='card-list'
          onDragOver={handleDragover}
          onDrop={handleDrop}
        >
          <CardItem card={card} />
        </div>
      ))}

      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={() => listDispatch({ type: 'HANDLE_CARD_CLICK' })}
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
              onChange={(e) =>
                listDispatch({
                  type: 'ADD_CARD_INPUT',
                  fieldName: 'cardTitle',
                  payLoad: e.target.value
                })}
            />
            <button className='add-card-btn'>Add Card</button>
            <span
              className='X-image'
              onClick={() => listDispatch({ type: 'HANDLE_CLOSE' })}
            >X
            </span>
          </form>
          </div> : null}

    </div>
  )
}
export default CardsList
