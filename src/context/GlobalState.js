import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
//Initial State

const initialState = {
  classrooms: [],
  classroom: {
    assignments : []
  },
  error: null,
  assignment: {
    authorName: '',
    dueDate: null,
    postedOn: null,
    assignmentTitle: '',
    content: '',
    link:''
  },
  loading: false,
  name: "",
  isLoggedIn: false,
  isFaculty: false,
  verificationStatus: "pending",
  verificationError: null,
  email: "tss11@iitbbs.ac.in",
  signupSuccess: false,
  person: {},
  token:null,
  userId: "004",
  allQuestionOfClassRoom: [],
  allAnswerOfQuestion: [],
  message: null,
  solutionsOfAssignment: [],
};

const URL = 'https://onlined-be.azurewebsites.net'//'http://localhost:5000';
//Create Context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  async function getClassrooms() {
    if (state.isLoggedIn) {
      const email = state.email;
      console.log("get classrooms", email);
      try {
        // dummy api
        dispatch({
          type: "CLASSROOMS_RQST",
        });
        const res = await axios.get(
          `${URL}/api/v1/classroom?email=${email}`,{
            headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
          }
        );
        console.log("get classrooms", res.data);
        dispatch({
          type: "CLASSROOMS_RQST_SUCCESS",
          payload: res.data.classrooms,
        });
      } catch (err) {
        dispatch({
          type: "GET_RQST_ERROR",
          payload: err.response.data.error,
        });
      }
    }
  }

  async function getAssignment(assignmentId) {
    console.log("get assignment gc",assignmentId)
    // if(state.isLoggedIn){
    dispatch({
      type: "ASSIGNMENT_RQST",
    });
    try {
      const response = await axios.get(
        `${URL}/api/v1/assignment/${assignmentId}`,{
          headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
        }
        
      );
      console.log("get assignment", response.data);
      dispatch({
        type: "ASSIGNMENT_RQST_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.log("get assignment", error);
      dispatch({
        type: "GET_RQST_ERROR",
        payload: error,
      });
    }
    // }
  }
  
  async function getAssignmentsOfClassroom(classroomId) {
    const classroom_id = classroomId;
    // if(state.isLoggedIn){
    dispatch({
      type: "ASSIGNMENTS_RQST",
    });
    try {
      const response = await axios.get(
        `${URL}/api/v1/classroom/${classroom_id}`,{
          headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
        }
      );
      console.log("get assignments", response.data);
      dispatch({
        type: "ASSIGNMENTS_RQST_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.log("get assignments", error);
      dispatch({
        type: "GET_RQST_ERROR",
      });
    }
    // }
  }
  async function createClassroom(className) {
    console.log("class creation in progress");
    dispatch({
      type: "CLASSROOM_POST_RQST",
    });
    const personId = "626126cdd3990228bb87b725";
    try {
      const response = await axios.post("/api/v1/classroom/", {
        className,
        personId,
      },{
        headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
      });
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      dispatch({
        type: "POST_RQST_ERROR",
        payload: error,
      });
    }
  }
  /*async function postAssignment(assignment){
        dispatch({
            type : 'ASSIGNMENT_POST_RQST'
        })
        try{
            console.log("post assignment",assignment)
            const response = await axios.post(`/api/v1/assignment/`,assignment)
            console.log(response)
            

        }catch(error){
            console.log("post assignments",error)
            dispatch({
                type : 'POST_RQST_ERROR',
                payload : error
            })
        }
    }*/

  function userLogout() {
    dispatch({
      type: "USER_LOGOUT",
    });
  }

  // async function userLogin(data) {
  //   dispatch({
  //     type: "USER_LOGIN",
  //     payload: data,
  //   });
  //   const email = data.email;
  //   try {
  //     const res = await axios.get(`api/v1/classrooms/${email}`);

  //     dispatch({
  //       type: "GET_CLASSROOMS",
  //       payload: res.data.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: "ERROR",
  //       payload: err.response.data.error,
  //     });
  //   }
  // }

  async function verifyUser(userId) {
    console.log(" UserId sent for verification is " + userId);
    try {
      const res = await axios.post(
        `${URL}/api/v1/auth/verify/` + userId
      );

      dispatch({
        type: "VERIFY_USER",
        payload: res.data.verificationStatus,
      });
    } catch (err) {
      dispatch({
        type: "VERIFICATION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  const getAllQuestionOfClassRoom = async (classRoomId) => {
    if (state.isLoggedIn) {
      dispatch({
        type: "Questions_RQST",
      });
      try {
        const host = `${URL}`;
        const URL = host + `/api/v1/discussion/classroom/${classRoomId}`;
        const response = await axios.get(URL,{
          headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
        });

        dispatch({
          type: "ALLQUESTION_RQST_SUCCESS",
          payload: response.data.allQuestions,
        });
      } catch (error) {
        console.log("get AllQuestions", error);
        dispatch({
          type: "GET_RQST_ERROR",
        });
      }
    } else {
      dispatch({ type: "GET_RQST_ERROR" });
    }
  };

  const getAllAnswerOfQuestion = async (classRoomId, questionId) => {
    dispatch({
      type: "Answers_RQST",
    });
    try {
      const host = `${URL}`;
      const URL =
        host +
        `/api/v1/discussion/classroom/${classRoomId}/question/${questionId}`;

      const response = await axios.get(URL,{
        headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
      });

      dispatch({
        type: "AllANSWER_RQST_SUCCESS",
        payload: response.data.allAnswers,
      });
    } catch (error) {
      console.log("Get AllAnswers", error);
      dispatch({ type: "GET_RQST_ERROR" });
    }
  }

  async function login(email, password) {
    console.log(" Login req sent for  " + email + " with pass " + password);
    try {
      const res = await axios.post(
        `${URL}/api/v1/auth/login/`,
        {
          email,
          password,
        }
      );

      dispatch({
        type: "LOGIN_USER",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response,
      });
    }
  }

  async function signUp(person) {
    var { email, password, isFaculty, name } = person;
    console.log(" SignUp req recvd");
    try {
      const res = await axios.post(
        `${URL}/api/v1/auth/signup/`,
        {
          email,
          password,
          isFaculty,
          name,
          profile_pic: "",
        }
      );
      console.log(res);
      dispatch({
        type: "SIGNUP_USER",
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: "AUTH_ERROR",
        payload: err.response,
      });
    }
  }

  async function joinClassroom(classcode) {
    // var {email, password, isFaculty, name} = person;
    console.log(" Join class req recvd");
    try {
      // console.log(`${URL}/api/v1/account/${state.person._id}`)
      const res = await axios.put(
        `${URL}/api/v1/account/${state.person._id}`,
        {
          email: state.person.email,
          name: state.person.name,
          classcode: Number(classcode),
        },{
          headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
        });
      console.log(res);
      dispatch({
        type: "JOIN_CLASSROOM",
        payload: res.data.person,
      });
    } catch (err) {
      dispatch({
        type: "JOIN_CLASSROOM_ERROR",
        payload: err.response,
      });
    }
  }

  const addQuestion = async (classRoomId, question) => {
    dispatch({
      type: "Add_Question_RQST",
    });
    try {
      const host = `${URL}`;
      const URL = host + `/api/v1/discussion/classroom/${classRoomId}`;
      question.authorId = state.userId;
      console.log(question);
      console.log(URL);

      const response = await axios.post(URL, question,{
        headers: { "Content-Type": "application/json" ,"Authorization" : `${state.token}`}
      });

      console.log(response);
      dispatch({
        type: "AddingNewQuestion_RQST_SUCCESS",
      });
    } catch (error) {
      console.log("Adding new Question failed", error);
      dispatch({ type: "GET_RQST_ERROR" });
    }
  };

  async function getSolutionsOfAssignment(assignmentId) {
    console.log(" get solns ");
    try {
      // console.log(`${URL}/api/v1/account/${state.person._id}`)
      const res = await axios.get(`${URL}/api/v1/solution/assignment/${assignmentId}`);
      console.log(res);
      var ans = []
      if(res.data.solutions.length > 0) ans = res.data.solutions;
      dispatch({
        type: "GET_SOLUTIONS",
        payload: ans,
      });
    } catch (err) {
      dispatch({
        type: "GET_SOLUTIONS_ERROR",
        payload: err.response,
      });
    } 
  }

  async function assignMarks(marks, solutionId) {
    console.log(" assign marks req recvd");
    try {
      // console.log(`${URL}/api/v1/account/${state.person._id}`)
      const res = await axios.put(
        `${URL}/api/v1/solution`,
        {
          solution : {
            _id: solutionId,
            marks: Number(marks)
          },
        }
      );
      console.log(res);
      var newArray = state.solutionsOfAssignment.map((sol) => {
        if(sol._id === solutionId){
          return res.data.updatedSolution
        }else return sol
      });
      console.log(newArray)
      dispatch({
        type: "ASSIGN_MARKS",
        payload: newArray
      });
    } catch (err) {
      dispatch({
        type: "ASSIGN_ERROR",
        payload: err.response,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        classrooms: state.classrooms,
        classroom: state.classroom,
        error: state.error,
        loading: state.loading,
        name: state.name,
        assignment: state.assignment,
        email: state.email,
        isLoggedIn: state.isLoggedIn,
        isFaculty: state.isFaculty,
        verificationStatus: state.verificationStatus,
        allAnswerOfQuestion: state.allAnswerOfQuestion,
        allQuestionOfClassRoom: state.allQuestionOfClassRoom,
        person: state.person,
        signupSuccess: state.signupSuccess,
        token:state.token,
        solutionsOfAssignment: state.solutionsOfAssignment,
        message: state.message,
        getClassrooms,
        // userLogin,
        getAssignment,
        userLogout,
        verifyUser,
        getAssignmentsOfClassroom,
        getAllAnswerOfQuestion,
        getAllQuestionOfClassRoom,
        addQuestion,
        login,
        signUp,
        createClassroom,
        getAssignmentsOfClassroom,
        joinClassroom,
        getSolutionsOfAssignment,
        assignMarks
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
