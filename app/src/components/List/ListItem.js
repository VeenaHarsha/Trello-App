import React, { createContext } from 'react'
import CardsList from '../Cards/CardsList'

export const CardSta = createContext()
export const ListDispatchContext = createContext()

function ListItem ({ list }) {
  return (
    <div className='list-div'>
      <span className='list-header'> {list.list_name}</span>
      <div>
        <CardsList list={list} />
      </div>
    </div>
  )
}

export default ListItem
