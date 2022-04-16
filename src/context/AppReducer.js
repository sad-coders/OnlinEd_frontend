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
    case 'CLASSROOMS_RQST' : 
      return {
        ...state,
        loading : true,
        classrooms : []
      }  
    case 'CLASSROOMS_RQST_SUCCESS' : 
    return {
      ...state,
      loading : false,
      classrooms : action.payload
    }  
    default : 
        return state
  }
}