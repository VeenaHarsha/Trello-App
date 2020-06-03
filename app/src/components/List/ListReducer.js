import { HANDLE_LIST_CLICK, ADD_LIST, GET_LISTS, ADD_LIST_INPUT } from '../../actionType'

export const initialState = {
  listName: '',
  lists: [],
  showListInput: false
}

export const listReducer = (state, action) => {
  console.log('Action is:', action)
  switch (action.type) {
    case ADD_LIST_INPUT: {
      return {
        ...state,
        [action.fieldName]: action.payLoad
      }
    }
    case GET_LISTS : {
      console.log('From getBoardList: ', state, action.payLoad)
      return {
        ...state,
        lists: action.payLoad
      }
    }
    case ADD_LIST : {
      return {
        ...state,
        lists: state.lists.concat(action.payLoad),
        listName: '',
        showListInput: !state.showListInput
      }
    }
    case HANDLE_LIST_CLICK: {
      return {
        ...state,
        showListInput: !state.showListInput
      }
    }

    default: {
      return state
    }
  }
}
