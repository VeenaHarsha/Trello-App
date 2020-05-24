import React, { useState, useEffect, useContext, useReducer } from 'react'
import { StateContext, DispatchContext } from '../../App'
import ListItem from './ListItem'

const initialState = {
  listName:'',
  lists: [],
  showListInput: false
}

function Lists () {
  const [state, dispatch] = useReducer(reducerFun, initialState)
  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const { selBoard, selBoardName } = state

  useEffect(() => {
    getLists()
  }, [])

  const getLists = async () => {
    const response = await window.fetch(`http://localhost:2809/trello/list/${selBoard}`)
    const data = await response.json()
    console.log(data)
    setLists(data)
  }

  const handleChange = (event) => {
    setListName(event.target.value)
  }
  const handleListClick = () => {
    setShowListInput(true)
  }
  const submitList = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ board_id: selBoard, list_name: listName })
    }
    try {
      const response = await window.fetch('http://localhost:2809/trello/list/add', options)
      const data = await response.json()
      // console.log('Response data is:', [...lists, data])
      setLists([...lists, data])
      setListName('')
    } catch (err) {
      console.log('Error: ', err)
    }
  }

  return (
    <div className='list-div-container'>
      <div className='list-header'>
        <h2>{selBoardName} </h2>
      </div>
      <div className='add-list-div'>
        <form className='list-form' onSubmit={submitList}>
          {!showListInput
            ? <a onClick={handleListClick}>
              <span className='plus-img'>+</span>
              <span className='add-text'>Add list...</span>
            </a> : null}
          {showListInput ? <div>
            <input
              placeholder='Enter list title..'
              type='text'
              className='add-list-input'
              onChange={handleChange}
              value={listName}
            />
            <button className='add-list-btn'>Add List</button>
          </div> : null}
        </form>
      </div>
      <div className='all-list-div'>
        {lists.map(list => (
          <ListItem key={list.id} list={list} />
        ))}
      </div>
    </div>
  )
}
export default Lists


import React, { useState, useContext } from 'react'
import { StateContext } from '../../App'

function ListItem ({ list }) {
  const [showCardInput, setShowCardInput] = useState(false)
  const [cardTitle, setCardTitle] = useState('')
  const state = useContext(StateContext)

  const handleCardInput = (event) => {
    setCardTitle(event.target.value)
  }
  const handleCardClick = () => {
    setShowCardInput(true)
  }
  const submitCard = async (event) => {
    const selListId = 1
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({ board_id: state.selBoard, list_id: selListId, card_desc: cardTitle, is_archive: false })
    }
    const response = await window.fetch('http://localhost:2809/trello/card/add', options)
    const data = await response.json()
    console.log('Data is: ', data)
  }
  return (
    <div className='list-div'>
      <span className='list-header'> {list.list_name} </span>
      {showCardInput
        ? <form className='card-form' onSubmit={submitCard}>
          <textarea
            type='text'
            className='card-text-input'
            placeholder='Enter title for this card..'
            onChange={handleCardInput}
            value={cardTitle}
          />
          <button className='add-card-btn'>Add Card</button>
          <span className='X-image'>X</span>
        </form> : null}
      {!showCardInput
        ? <div className='add-card-div'>
          <span className='plus-img'>+</span>
          <a
            className='add-card-link'
            onClick={handleCardClick}
          >
                  Add a Card
          </a>
        </div> : null}
    </div>)
}
export default ListItem
