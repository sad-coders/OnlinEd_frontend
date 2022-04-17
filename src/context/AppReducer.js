const reducer =  (state , action) => {
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
    case 'ASSIGNMENT_RQST_SUCCESS' : 
      return {
        ...state,
        loading : false,
        assignment : action.payload
      }
    case 'ASSIGNMENT_RQST' : 
      return {
        ...state,
        loading : true,
        assignment : {}
      }  
      case 'VERIFY_USER': 
        return {
          ...state,
          verificationStatus: action.payload
        }
      case 'VERIFICATION_ERROR': 
        return {
          ...state,
          verificationStatus: 'failed',
          verificationError: action.payload
        }
    default : 
        return state
  }
}

export default reducer;