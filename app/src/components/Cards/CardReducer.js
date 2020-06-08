import { GET_LIST_CARDS, ADD_CARD, DELETE_CARD, ERROR, HANDLE_CLOSE, ADD_CARD_INPUT, HANDLE_CARD_CLICK, UPDATE_CARD_POSITION, UPDATE_CARD_POSITION_ACROSS_LIST } from '../../actionType'

export const initialState = {
  cards: [],
  showCardInput: false,
  cardTitle: ''
}

export const cardReducer = (state, action) => {
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
    case DELETE_CARD: {
      return {
        ...state,
        cards: action.payLoad
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
    case UPDATE_CARD_POSITION: {
      const newCards = (state.cards.map(
        card => (
          card.id === action.payLoad[0].id ? { ...card, position: action.payLoad[0].position }
            : card
        )
      ))
      console.log('UPDATED Card POS IS: ', newCards.sort((a, b) => (a.position > b.position) ? 1 : -1))
      return {
        // ...state,
        cards: newCards.sort((a, b) => (a.position > b.position) ? 1 : -1)
      }
    }
    case UPDATE_CARD_POSITION_ACROSS_LIST: {
      console.log('UPDATED Card POS Across Lists IS: ', state, state.cards.concat(action.payLoad[0]).sort((a, b) => (a.position > b.position) ? 1 : -1))
      return {
        ...state,
        cards: state.cards.concat(action.payLoad[0]).sort((a, b) => (a.position > b.position) ? 1 : -1)
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
