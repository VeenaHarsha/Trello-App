import React, { useEffect, useContext, useReducer } from 'react'
import { StateContext } from '../../App'
import ListItem from './ListItem'

const initialState = {
  listName: '',
  lists: [],
  showListInput: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case 'getLists': {
      return {
        ...state,
        lists: state.lists.concat(action.payLoad)
      }
    }
    case 'addList': {
      return {
        ...state,
        lists: state.lists.concat(action.payLoad),
        listName: ''
      }
    }
    case 'handleListClick': {
      return {
        ...state,
        showListInput: !state.showListInput
      }
    }
    default: {
      return state
    }
  }
}

function Lists () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const boardState = useContext(StateContext)
  // const boardDispatch = useContext(DispatchContext)
  const { selBoard, selBoardName } = boardState
  const { listName, lists, showListInput } = state

  useEffect(() => {
    getLists()
  }, [])

  const getLists = async () => {
    const response = await window.fetch(`http://localhost:2809/trello/list/${selBoard}`)
    const data = await response.json()
    console.log(data)
    dispatch({ type: 'getLists', payLoad: data })
    // setLists(data)
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
      dispatch({ type: 'addList', payLoad: data })
    } catch (err) {
      dispatch({ type: 'error', payLoad: err })
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
            ? <a onClick={() => dispatch({ type: 'handleListClick' })}>
              <span className='plus-img'>+</span>
              <span className='add-text'>Add list...</span>
            </a> : null}
          {showListInput ? <div>
            <input
              placeholder='Enter list title..'
              type='text'
              className='add-list-input'
              // onChange={handleChange}
              onChange={(e) =>
                dispatch({
                  type: 'field',
                  fieldName: 'listName',
                  payLoad: e.target.value
                })}
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
