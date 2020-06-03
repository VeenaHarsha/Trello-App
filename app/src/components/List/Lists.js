import React, { useEffect, useContext, useReducer } from 'react'
import { StateContext } from '../../App'
import { initialState, listReducer } from './ListReducer'
import ListItem from './ListItem'

function Lists () {
  const boardState = useContext(StateContext)
  const { selBoard, selBoardName } = boardState
  const [state, dispatch] = useReducer(listReducer, initialState)
  const { listName, lists, showListInput } = state

  useEffect(() => {
    getLists()
  }, [])

  const getLists = async () => {
    try {
      const response = await window.fetch(`http://localhost:2809/trello/list/${selBoard}`)
      const data = await response.json()
      console.log('VVV:', data)
      dispatch({ type: 'GET_LISTS', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
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
            Add a list
          </div> : null}
      </div>
    </div>
  )
}
export default Lists
