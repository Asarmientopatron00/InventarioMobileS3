export const authReducer = (state, action) => {
  switch (action.type) {
    case "addError":
      return {
        ...state,
        status: 'not-authenticated',
        messages: action.payload,
        access_token: null
      }
    case "removeError":
      return {
        ...state,
        messages: ''
      }
    case "signIn": 
      return {
        ...state,
        messages: '',
        status: 'authenticated',
        access_token: action.payload.access_token,
        token_type: action.payload.token_type,
        expires_in: action.payload.expires_in,
        refresh_token: action.payload.refresh_token,
      }
    case "getSession": 
      return {
        ...state,
        user: action.payload.user,
      }
    case "logout":
    case "notAuthenticated":
      return {
        ...state,
        status: "not-authenticated",
        access_token: null,
        token_type: null,
        expires_in:    null,
        refresh_token: null,
        user: null,
        access_status: 'PDTE'
      }
    case "setToken": 
      return {
        ...state,
        messages: '',
        status: 'authenticated',
        access_token: action.payload.access_token,
      }
    case "setStatus": 
      return {
        ...state,
        access_status: action.payload.estado_acceso,
      }
    default:
      return state;
  }
}