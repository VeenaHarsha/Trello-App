import React, { useState, useEffect } from 'react'

function Lists (props) {
  const { boardId, boardName } = props
  const [listName, setListName] = useState('')
  const [lists, setLists] = useState([{}])

  useEffect(() => {
    console.log('List:Am from useEffect...')
    getLists()
  }, [])

  const getLists = async () => {
    console.log('Board Id is :', boardId)
    const response = await window.fetch(`http://localhost:2809/trello/list/${boardId}`)
    const data = await response.json()
    setLists(data)
  }

  const handleChange = (event) => {
    setListName(event.target.value)
  }

  const handleAddList = async () => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json;charset=utf-8;' },
      body: JSON.stringify({ boardId: boardId, list_name: listName })
    }
    console.log('OPtions:', options)
    try {
      const response = await window.fetch('http://localhost:2809/trello/list/add', options)
      console.log('Response:', response)
      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.log('Error: ', err)
    }
  }
  return (
    <div className='list-div'>
      <h2>{boardName}</h2>
      <div className='add-list'>
        <form onSubmit={handleAddList}>
          <input
            placeholder='Add a list..'
            type='text'
            className='add-list-input'
            onChange={handleChange}
            value={listName}
          />
        </form>
      </div>
      <div>
        {lists.map(l => {
          console.log(l.listName)
        })}
      </div>
    </div>
  )
}
export default Lists
