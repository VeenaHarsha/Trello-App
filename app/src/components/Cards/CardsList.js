import React, { useContext, useReducer, useEffect } from 'react'
import CardItem from './CardItem'
import { StateContext } from '../../App'
import { initialState, cardReducer } from './CardReducer'

function CardsList ({ list }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)
  const boardState = useContext(StateContext)
  const { selBoard } = boardState
  const { cards, showCardInput, cardTitle } = state

  useEffect(() => {
    getListCards()
  }, [])

  const getListCards = async () => {
    const selList = list.id
    const url = `http://localhost:2809/trello/card/?boardId=${selBoard}&listId=${selList}`
    try {
      const response = await window.fetch(url)
      const data = await response.json()
      dispatch({ type: 'GET_LIST_CARDS', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

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
      dispatch({ type: 'ADD_CARD', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const updateCard = async (event, sourceObj, targetObj) => {
    event.preventDefault()
    console.log('Object:', sourceObj, targetObj)
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: sourceObj.position
      })
    }
    try {
      const url = `http://localhost:2809/trello/card/updatePosition/?cardId=${sourceObj.id}&&listId=${targetObj.list_id}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_CARD_POSITION', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const updateCardPosition = (event, sourceObj, targetObj) => {
    console.log('AM In UPDATE CARD POSITION')
    event.preventDefault()
    if (sourceObj.position < targetObj.position) {
      sourceObj.position = targetObj.position + 0.1
    } else if (sourceObj.position > targetObj.position) {
      sourceObj.position = targetObj.position - 0.1
    }
    // updateCard(event, sourceObj, sourceObj.position)
    updateCard(event, sourceObj, targetObj)
  }

  const handleDragover = (e) => {
    console.log('AM In DRAG OVER')
    e.preventDefault()
  }

  const handleDrop = (e, target) => {
    e.stopPropagation()
    e.preventDefault()
    const obj = JSON.parse(e.dataTransfer.getData('card'))
    updateCardPosition(e, obj, target)
    // e.dataTransfer.clearData()
  }
  return (
    <div className='card-container'>
      {cards.map(card => (
        <div
          key={card.id}
          className='card-list'
          onDragOver={handleDragover}
          onDrop={(e) => handleDrop(e, card)}
        >
          <CardItem card={card} />
        </div>
      ))}

      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={() => dispatch({ type: 'HANDLE_CARD_CLICK' })}
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
                dispatch({
                  type: 'ADD_CARD_INPUT',
                  fieldName: 'cardTitle',
                  payLoad: e.target.value
                })}
            />
            <button className='add-card-btn'>Add Card</button>
            <span
              className='X-image'
              onClick={() => dispatch({ type: 'HANDLE_CLOSE' })}
            >X
            </span>
          </form>
          </div> : null}

    </div>
  )
}
export default CardsList
