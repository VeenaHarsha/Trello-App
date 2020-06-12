import {
  GET_LIST_CARDS, ADD_CARD, DELETE_CARD, ERROR, HANDLE_CLOSE,
  ADD_CARD_INPUT, HANDLE_ADD_CARD, UPDATE_CARD_POSITION,
  UPDATE_CARD_POSITION_ACROSS_LIST, UPDATE_CARD_TITLE, HANDLE_EDIT_CARD,
  HANDLE_COPY_CARD_FORM, HANDLE_BOARD_SELECT, HANDLE_LIST_SELECT, HANDLE_CLOSE_OVERLAY,
  HANDLE_COPY_CARD_TO, HANDLE_MOVE_CARD_FORM
} from '../../actionType'

export const initialState = {
  cards: [],
  showCardInput: false,
  cardTitle: '',
  showOverlay: false,
  showCardEdit: false,
  showCopyCardForm: false,
  showMoveCardForm: false
}

export const cardReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_ADD_CARD: {
      return {
        ...state,
        showCardInput: !state.showCardInput
      }
    }
    case HANDLE_EDIT_CARD: {
      console.log('From EDIT Card:', action.type, state.showCardEdit, state.showOverlay)
      return {
        ...state,
        showCardEdit: !state.showCardEdit,
        showOverlay: !state.showOverlay
      }
    }
    case HANDLE_COPY_CARD_FORM: {
      return {
        ...state,
        showCopyCardForm: !state.showCopyCardForm
      }
    }
    case HANDLE_MOVE_CARD_FORM: {
      return {
        ...state,
        showMoveCardForm: !state.showMoveCardForm
      }
    }
    case HANDLE_COPY_CARD_TO: {
      // state.cards.filter(card => card.id !== action.payLoad)
      // Need to get the cards of newly added card's list
      const filtered = (state.cards.filter(c => (
        c.list_id !== action.payLoad.list_id
      )))
      console.log('Filtered are: ', filtered)

      const newCards = (filtered.map(
        card => (
          (card.board_id === action.payLoad.board_id &&
          card.list_id === action.payLoad.list_id) ? state.cards.concat(action.payLoad)
            : card
        )
      ))
      console.log('NewCards are: ', filtered, newCards)
      // { ...card, card_desc: action.payLoad.card_desc }
      return {
        ...state,
        cards: newCards, // state.cards.concat(action.payLoad),
        showCopyCardForm: !state.showCopyCardForm,
        showOverlay: !state.showOverlay
      }
    }
    case HANDLE_BOARD_SELECT: {
      return {
        ...state,
        showChooseBoard: !state.showChooseBoard
      }
    }
    case HANDLE_LIST_SELECT: {
      return {
        ...state,
        showChooseList: !state.showChooseList
      }
    }
    case HANDLE_CLOSE_OVERLAY: {
      console.log('PayLoad is : ', state.showOverlay)
      return {
        ...state,
        showOverlay: !state.showOverlay
      }
    }
    case ADD_CARD_INPUT : {
      console.log('ADD_CARD_INPUT:', action.payLoad)
      return {
        ...state,
        [action.payLoad.fieldName]: action.payLoad.value
      }
    }
    case UPDATE_CARD_TITLE : {
      const newCards = (state.cards.map(
        card => (
          card.id === action.payLoad.id ? { ...card, card_desc: action.payLoad.card_desc }
            : card
        )
      ))
      return {
        cards: newCards
      }
    }
    case ADD_CARD: {
      console.log('Handling Copy:', action.payLoad)
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
        cards: state.cards.filter(card => card.id !== action.payLoad),
        showOverlay: !state.showOverlay,
        showCopyCardForm: !state.showCopyCardForm,
        showMoveCardForm: !state.showMoveCardForm
      }
    }
    case GET_LIST_CARDS: {
      console.log('Get LIST Cards: payload:', action.payLoad, 'State:', state)
      return {
        ...state,
        cards: action.payLoad
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
