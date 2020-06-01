import React, { useEffect, useContext, useReducer } from 'react'
import { StateContext } from '../../App'
import ListItem from './ListItem'
import { HANDLE_LIST_CLICK, ADD_LIST, GET_LISTS, ADD_LIST_INPUT } from '../../actionType'

const initialListState = {
  listName: '',
  lists: [],
  showListInput: false
}

const listReducer = (state, action) => {
  console.log('Action is:', action)
  switch (action.type) {
    case ADD_LIST_INPUT: {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case GET_LISTS : {
      return {
        ...state,
        lists: state.lists.concat(action.payLoad)
      }
    }
    case ADD_LIST : {
      return {
        ...state,
        lists: state.lists.concat(action.payLoad),
        listName: '',
        showListInput: !state.showListInput
      }
    }
    case HANDLE_LIST_CLICK: {
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
  const [state, dispatch] = useReducer(listReducer, initialListState)
  const boardState = useContext(StateContext)
  const { selBoard, selBoardName } = boardState
  const { listName, lists, showListInput } = state

  useEffect(() => {
    getLists()
  }, [])

  const getLists = async () => {
    const response = await window.fetch(`http://localhost:2809/trello/list/${selBoard}`)
    const data = await response.json()
    dispatch({ type: GET_LISTS, payLoad: data })
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
      dispatch({ type: 'ADD_LIST', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  return (
    <div className='list-div-container'>
      <p className='disp-board-name'>{selBoardName} </p>
      <div className='all-list-div'>
        {lists.map(list => (
          <ListItem key={list.id} list={list} />
        ))}

        {showListInput
          ? <div>
            <form className='list-form' onSubmit={submitList}>
              <input
                placeholder='Enter list title..'
                type='text'
                className='add-list-input'
                onChange={(e) =>
                  dispatch({
                    type: 'ADD_LIST_INPUT',
                    fieldName: 'listName',
                    payLoad: e.target.value
                  })}
                value={listName}
              />
              <button
                type='button'
                className='add-list-btn'
                onClick={() => dispatch({ type: 'HANDLE_LIST_CLICK' })}
              >
                Close
              </button>
            </form>
          </div> : null}

        {!showListInput
          ? <div
            className='add-list-div'
            onClick={() => dispatch({ type: 'HANDLE_LIST_CLICK' })}
            >
            Add another list
          </div> : null}
      </div>
    </div>
  )
}
export default Lists
