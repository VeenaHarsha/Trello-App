import React, { useContext, useReducer, useEffect } from 'react'
import CardItem from './CardItem'
import { StateContext } from '../../App'
import { initialState, cardReducer } from './CardReducer'

function CardsList ({ list, lists, listDispatch }) {
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

  const submitAddCard = async (event) => {
    event.preventDefault()
    console.log('POSITION OF THE LAST CARD:', cards.sort((a, b) => (a.position > b.position) ? 1 : -1))
    const sortedCards = cards.sort((a, b) => (a.position > b.position) ? 1 : -1)
    const position = sortedCards.length ? sortedCards[sortedCards.length - 1].position + 1 : 1024

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        board_id: selBoard,
        list_id: list.id,
        card_desc: cardTitle,
        is_archive: false,
        position: position
      })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/card/add', options)
      const data = await response.json()
      console.log('NEwly added Card is:', data)
      dispatch({ type: 'ADD_CARD', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const moveCardSameList = async (event, sourceObj, targetObj) => {
    event.preventDefault()
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
  const moveCardAcrossList = async (event, sourceObj, targetObj) => {
    event.preventDefault()
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
      console.log('COV: ', cards)
      dispatch({ type: 'UPDATE_CARD_POSITION_ACROSS_LIST', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const updateCardPosition = (event, draggedObj, targetObj) => {
    event.preventDefault()
    console.log('Cards:', cards, 'draggedObj:', draggedObj, 'TARGET:', targetObj.position)
    const prevElements = cards.map(card => (
      (card.position < targetObj.position) ? card.position : ''
    ))
    const prevElePos = (prevElements.length - 2) > 0 ? prevElements[prevElements.length - 2] : ''
    console.log('prevEl position is: ', prevElements, prevElements.length - 2, prevElePos)
    draggedObj.position = draggedObj.position < targetObj.position ? targetObj.position + 1 : (prevElePos + targetObj.position) / 2
    draggedObj.list_id === targetObj.list_id ? moveCardSameList(event, draggedObj, targetObj) : moveCardAcrossList(event, draggedObj, targetObj)
  }

  const handleDragover = (e) => {
    console.log('AM In DRAG OVER')
    e.preventDefault()
  }

  const handleDrop = (e, target) => {
    e.stopPropagation()
    e.preventDefault()
    const draggedObj = JSON.parse(e.dataTransfer.getData('card'))
    updateCardPosition(e, draggedObj, target)
    // e.dataTransfer.clearData()
  }
  const handleDeleteCard = async (event, cardId) => {
    event.preventDefault()
    const options = { method: 'DELETE' }
    try {
      const respone = await window.fetch(`http://localhost:2809/trello/card/delete/${cardId}`, options)
      await respone.json()
      console.log('After Delete:', cards.length)
      dispatch({ type: 'DELETE_CARD', payLoad: cardId })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const handleCardUpdate = async (event, cardId, editTextArea, card) => {
    event.preventDefault()
    console.log('Checking...', cardId, editTextArea)
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ card_desc: editTextArea })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/trello/card/updateCardTitle/${cardId}`, options)
      await response.json()
      console.log('Vas:', { ...card, card_desc: editTextArea })
      dispatch({
        type: 'UPDATE_CARD_TITLE',
        payLoad: { ...card, card_desc: editTextArea }
      })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const handleCopyCard = async (event, newTitle, newBoardId, newListId) => {
    console.log('Details r: ', newTitle, newBoardId, newListId)
    event.preventDefault()
    const sortedCards = cards.sort((a, b) => (a.position > b.position) ? 1 : -1)
    const position = sortedCards.length ? sortedCards[sortedCards.length - 1].position + 1 : 1024

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        board_id: newBoardId,
        list_id: newListId,
        card_desc: newTitle,
        is_archive: false,
        position: position
      })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/card/add', options)
      const data = await response.json()
      console.log('NEwly added Card from Copy Card Form is:', data)
      dispatch({ type: 'HANDLE_COPY_CARD_TO', payLoad: data })
      
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }
  const handleMoveCard = (e, card, newBoardId, newListId) => {
    // addCardToNewDestination &  deleteFromCurrentLocation
    handleCopyCard(e, card.card_desc, newBoardId, newListId)
    handleDeleteCard(e, card.id)
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
          <CardItem
            card={card}
            list={list}
            lists={lists}
            onDeleteCard={handleDeleteCard}
            onCardUpdate={handleCardUpdate}
            onAddCard={handleCopyCard}
            onMoveCard={handleMoveCard}
          />
        </div>
      ))}

      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={() => dispatch({ type: 'HANDLE_ADD_CARD' })}
          >
              Add a Card
          </a>
          </div> : null}
      {showCardInput
        ? <div>
          <form className='card-form' onSubmit={submitAddCard}>
            <textarea
              type='text'
              className='card-text-input'
              placeholder='Enter title for this card..'
              name='cardTitle'
              value={cardTitle}
              onChange={(e) =>
                dispatch({
                  type: 'ADD_CARD_INPUT',
                  payLoad: {
                    fieldName: e.target.name,
                    value: e.target.value
                  }
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
