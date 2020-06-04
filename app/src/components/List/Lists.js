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
  const updateList = async (event, sourceObj, targetObj) => {
    event.preventDefault()
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        position: sourceObj.position
      })
    }
    try {
      const url = `http://localhost:2809/trello/list/updateListPosition/?listId=${sourceObj.id}&&boardId=${targetObj.board_id}`
      const response = await window.fetch(url, options)
      const data = await response.json()
      dispatch({ type: 'UPDATE_LIST_POSITION', payLoad: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payLoad: err })
    }
  }

  const updateListPosition = (event, sourceObj, targetObj) => {
    event.preventDefault()
    if (sourceObj.position < targetObj.position) {
      sourceObj.position = targetObj.position + 0.1
    } else if (sourceObj.position > targetObj.position) {
      sourceObj.position = targetObj.position - 0.1
    }
    updateList(event, sourceObj, targetObj)
  }

  const handleDragover = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, target) => {
    e.stopPropagation()
    e.preventDefault()
    const obj = JSON.parse(e.dataTransfer.getData('list'))
    updateListPosition(e, obj, target)
    // e.dataTransfer.clearData()
  }

  return (
    <div className='list-div-container'>
      <p className='disp-board-name'>{selBoardName} </p>
      <div className='all-list-div'>
        {lists.map(list => (
          <div
            key={list.id}
            className='drag-list'
            onDragOver={handleDragover}
            onDrop={(e) => handleDrop(e, list)}
          >
            <ListItem list={list} />
          </div>
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
