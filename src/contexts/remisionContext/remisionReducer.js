export const remisionReducer = (state, action) => {
  switch (action.type) {
    case "getDatos":
      return {
        ...state,
        status: 'loaded',
        datos: action.payload,
      }
    case "read":
      return {
        ...state,
        selectedRow: action.payload
      }
    case "resetStatus":
      return {
        ...state,
        status: 'loading'
      }
    default:
      return state;
  }
}