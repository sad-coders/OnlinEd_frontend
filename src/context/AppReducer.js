const reducer = (state, action) => {
  switch (action.type) {
    case "GET_RQST_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "POST_RQST_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "ASSIGNMENT_RQST_SUCCESS":
      return {
        ...state,
        loading: false,
        assignment: action.payload,
      };
    case "ASSIGNMENT_RQST":
      return {
        ...state,
        loading: true,
      };
    case "VERIFY_USER":
      return {
        ...state,
        verificationStatus: action.payload,
      };
    case "VERIFICATION_ERROR":
      return {
        ...state,
        verificationStatus: "failed",
        verificationError: action.payload,
      };
    case "CLASSROOMS_RQST":
      return {
        ...state,
        loading: true,
        classrooms: [],
      };
    case "CLASSROOMS_RQST_SUCCESS":
      return {
        ...state,
        loading: false,
        classrooms: action.payload,
      };
    case "ASSIGNMENTS_RQST":
      return {
        ...state,
        loading: true,
        classroom: {
          assignments: [],
        },
      };
    case "ASSIGNMENTS_RQST_SUCCESS":
      return {
        ...state,
        loading: false,
        classroom: action.payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isLoggedIn: action.payload.auth,
        token: action.payload.token,
        person: action.payload.person,
        email: action.payload.person.email,
        name: action.payload.person.name,
        isFaculty: !action.payload.person.isStudent,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        loginError: action.payload,
        message: "Login Failed! Try Again",
      };
    case "SIGNUP_USER":
      return {
        ...state,
        signupSuccess: action.payload.auth,
        message: "SignUp sucessful. Login to continue",
      };
    case "JOIN_CLASSROOM":
      return {
        ...state,
        person: action.payload,
        classrooms: action.payload.classrooms,
      };
    case "JOIN_CLASSROOM_ERROR":
      return {
        ...state,
        classroomError: action.payload,
      };
    case "CLASSROOM_POST_RQST":
      return {
        ...state,
        loading: true,
      };

    case "Questions_RQST":
      return {
        ...state,
        loading: true,
      };
    case "Answers_RQST":
      return {
        ...state,
        loading: true,
      };
    case "Add_Question_RQST":
      return { ...state, loading: true };

    case "Add_Answer_RQST":
      return { ...state, loading: true };

    case "AddingNewQuestion_RQST_SUCCESS":
      return {
        ...state,
        allQuestionOfClassRoom: action.payload,
        loading: false,
      };

    case "AddingNewAnswer_RQST_SUCCESS":
      return {
        ...state,
        allAnswerOfQuestion: action.payload,
        loading: false,
      };

    case "ALLQUESTION_RQST_SUCCESS":
      return {
        ...state,
        loading: false,
        allQuestionOfClassRoom: action.payload,
      };
    case "AllANSWER_RQST_SUCCESS":
      return {
        ...state,
        loading: false,
        allAnswerOfQuestion: action.payload,
      };
    /*case 'ASSIGNMENT_POST_RQST' : return {
       ...state,
       loading : true,
     }
     */
    case "GET_SOLUTIONS":
      return {
        ...state,
        solutionsOfAssignment: action.payload,
        // loading: false
      };
    case "GET_SOLUTIONS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "ASSIGN_MARKS":
      return {
        ...state,
        solutionsOfAssignment: action.payload,
      };
    case "CLASSROOM_CREATE_SUCCESS":
      return {
        ...state,
        classrooms: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
