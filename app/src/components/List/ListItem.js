import React, { useContext, useReducer, useEffect, createContext } from 'react'
import { StateContext } from '../../App'
import CardsList from '../Cards/CardsList'
import { GET_LIST_CARDS, ADD_CARD, ERROR, HANDLE_CLOSE, ADD_CARD_INPUT, HANDLE_CARD_CLICK } from '../../actionType'

export const ListStateContext = createContext()
export const ListDispatchContext = createContext()

const listReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_CARD_CLICK: {
      return {
        ...state,
        showCardInput: !state.showCardInput
      }
    }
    case ADD_CARD_INPUT : {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case ADD_CARD: {
      return {
        ...state,
        cards: state.cards.concat(action.payLoad),
        showCardInput: !state.showCardInput,
        cardTitle: ''
      }
    }
    case GET_LIST_CARDS: {
      return {
        ...state,
        cards: state.cards.concat(action.payLoad)
      }
    }
    case HANDLE_CLOSE: {
      return {
        ...state,
        showCardInput: !state.showCardInput
      }
    }
    case ERROR: {
      return {
        ...state,
        'Error: ': action.payLoad
      }
    }
    default: {
      return state
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

  return (
    <ListDispatchContext.Provider value={dispatch}>
      <ListStateContext.Provider value={state}>
        <div className='list-div'>
          <span className='list-header'> {list.list_name}</span>
          <div>
            <CardsList list={list} />
          </div>
        </div>
      </ListStateContext.Provider>
    </ListDispatchContext.Provider>
  )
}

export default ListItem
