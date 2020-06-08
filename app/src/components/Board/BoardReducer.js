import { GET_BOARD_LIST, SET_BOARD_NAME, ADD_BOARD, HANDLE_ADD_BOARD, HANDLE_BOARD_CLICK } from '../../actionType'

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_BOARD_NAME: {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case GET_BOARD_LIST: {
      console.log('From getBoardList: ', action.payLoad)
      return {
        ...state,
        boards: action.payLoad
      }
    }
    case ADD_BOARD : {
      return {
        ...state,
        boards: state.boards.concat(action.payLoad.result),
        boardName: '',
        showAddBoard: false
      }
    }
    case HANDLE_ADD_BOARD: {
      return {
        ...state,
        showAddBoard: !state.showAddBoard
      }
    }
    case 'ERROR': {
      return {
        ...state,
        'Error: ': action.payLoad
      }
    }
    case HANDLE_BOARD_CLICK : {
      console.log('Board Clicked:', action.payLoad)
      return {
        ...state,
        showBoardList: false,
        showNav: false,
        showLists: true,
        selBoard: action.payLoad.id,
        selBoardName: action.payLoad.name
      }
    }

    default: {
      return state
    }
  }
}
export const initialState = {
  showAddBoard: false,
  showBoardList: true,
  showNav: true,
  showLists: false,
  boards: [],
  boardName: '',
  selBoard: '',
  selBoardName: ''
}
