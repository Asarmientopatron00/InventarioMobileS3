export const commonReducer = (state, action)=> {
  switch (action.type) {
    case "addError":
      return {...state,
        error: action.payload
      }
    case "addMessage":
      return {...state,
        message: action.payload
      }
    case "resetState":
      return {...state,
        message: '',
        error: '',
      }
    default:
      return state;
  }
}