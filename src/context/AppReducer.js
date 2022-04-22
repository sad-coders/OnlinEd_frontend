const reducer =  (state , action) => {
  switch(action.type) {
    case 'GET_RQST_ERROR':
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
    case 'ASSIGNMENTS_RQST' :
      return  {
      ...state,
      laoding : true,
      classroom : []
    }
    case 'ASSIGNMENTS_RQST_SUCCESS' : 
     return {
       ...state,
       loading : false,
       classroom : action.payload
     }
    case 'LOGIN_USER' :
      return {
        ...state,
        isLoggedIn: action.payload.auth,
        token: action.payload.token,
        person: action.payload.person,
        email: action.payload.person.email
      }
    case 'LOGIN_ERROR' : 
      return {
        ...state,
        loginError: action.payload
      }
    case 'SIGNUP_USER' : 
      return {
        ...state,
        signupSuccess: action.payload.auth
      }
    default : 
        return state
  }
}

export default reducer;