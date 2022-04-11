export default (state , action) => {
  switch(action.type) {
    case 'GET_CLASSROOMS':
      return {
          ...state,
          loading :false,
          classrooms : action.payload
      }
    case 'GET_REQUEST_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default : 
        return state
  }
}