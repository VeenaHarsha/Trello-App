import React, { useContext, useReducer, useEffect, createContext } from 'react'
import { StateContext } from '../../App'
import Cards from '../Cards/Cards'

export const ListStateContext = createContext()
export const ListDispatchContext = createContext()

const listReducer = (state, action) => {
  switch (action.type) {
    case 'handleCardClick': {
      return {
        ...state,
        showCardInput: !state.showCardInput
      }
    }
    case 'field': {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case 'addCard': {
      return {
        ...state,
        cards: state.cards.concat(action.payLoad),
        showCardInput: !state.showCardInput
      }
    }
    case 'getListCards': {
      return {
        ...state,
        cards: state.cards.concat(action.payLoad)
      }
    }
  }
}
const listInitState = {
  cards: [],
  showCardInput: false,
  cardTitle: ''
}

function ListItem ({ list }) {
  const [state, dispatch] = useReducer(listReducer, listInitState)
  const boardState = useContext(StateContext)
  const { selBoard } = boardState
  const { cardTitle } = state

  useEffect(() => {
    getListCards()
  }, [])

  const getListCards = async () => {
    const selList = list.id
    const url = `http://localhost:2809/trello/card/?boardId=${selBoard}&listId=${selList}`
    try {
      const response = await window.fetch(url)
      const data = await response.json()
      dispatch({ type: 'getListCards', payLoad: data })
    } catch (err) {
      dispatch({ type: 'error', payLoad: err })
    }
  }

  return (
    <ListDispatchContext.Provider value={dispatch}>
      <ListStateContext.Provider value={state}>
        <div className='list-div'>
          <span className='list-header'> {list.list_name}</span>
          <div>
            <Cards list={list} />
          </div>
        </div>
      </ListStateContext.Provider>
    </ListDispatchContext.Provider>
  )
}

export default ListItem
