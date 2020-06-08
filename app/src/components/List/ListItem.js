import React from 'react'
import CardsList from '../Cards/CardsList'

function ListItem ({ list }) {
  const handleDragStart = (e, list) => {
    console.log('List is :', list)
    // dragSrcEl = e.target
    e.target.style.opacity = '0.4'
    const listObj = JSON.stringify(list)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('list', listObj)
  }
  const handleDragEnd = (e) => {
    e.target.style.opacity = ''
    e.currentTarget.style.border = ''
    // e.currentTarget.style.background = 'white'
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    // e.currentTarget.style.background = 'lightgreen'
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDragEnter = (e) => {
    // e.currentTarget.style.background = 'lightgreen'
    e.currentTarget.style.border = 'dashed'
  }

  const handleDragLeave = (e) => {
    // e.currentTarget.style.background = 'white'
    e.currentTarget.style.border = 'none'
  }

  return (
    <div
      className='list-div'
      draggable
      onDragStart={(e) => handleDragStart(e, list)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <span className='list-header'> {list.list_name}</span>
      <div>
        <CardsList list={list} />
      </div>
    </div>
  )
}

export default ListItem
