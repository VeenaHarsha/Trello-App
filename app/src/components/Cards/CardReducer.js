import { GET_LIST_CARDS, ADD_CARD, ERROR, HANDLE_CLOSE, ADD_CARD_INPUT, HANDLE_CARD_CLICK, UPDATE_CARD_POSITION } from '../../actionType'

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
      return {
        ...state
        // cards: state.cards.concat(action.payLoad)
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

export const initialState = {
  cards: [],
  showCardInput: false,
  cardTitle: ''
}
