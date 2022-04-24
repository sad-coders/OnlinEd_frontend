import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
//Initial State

const initialState = {
  classrooms: [],
  classroom: {
    assignments: [],
  },
  error: null,
  assignment: {
    authorName: "",
    dueDate: null,
    postedOn: null,
    assignmentTitle: "",
    content: "",
    link: "",
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
  token: null,
  userId: "004",
  allQuestionOfClassRoom: [],
  allAnswerOfQuestion: [],
  message: null,
  solutionsOfAssignment: [],
  postStatus: null,


  URL: "https://onlined-be.azurewebsites.net",
  // URL: "http://localhost:5000",
};

// const URL = 'http://localhost:5000';
// 'https://onlined-be.azurewebsites.net'
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
          `${state.URL}/api/v1/classroom?email=${email}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${state.token}`,
            },
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
    console.log("get assignment gc", assignmentId);
    // if(state.isLoggedIn){
    dispatch({
      type: "ASSIGNMENT_RQST",
    });
    try {
      const response = await axios.get(
        `${state.URL}/api/v1/assignment/${assignmentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${state.token}`,
          },
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
        `${state.URL}/api/v1/classroom/${classroom_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${state.token}`,
          },
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
    const personId = state.person._id;
    try {
      const response = await axios.post(
        `${state.URL}/api/v1/classroom/`,
        {
          className,
          personId,
          name: state.person.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${state.token}`,
          },
        }
      );
      console.log(response);
      var newclassrooms = state.classrooms;
      // newclassrooms
      if (response.status === 201) {
        dispatch({
          type: "CLASSROOM_CREATE_SUCCESS",
          payload: response.data.updatedPerson.classrooms,
        });
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
      const res = await axios.post(`${state.URL}/api/v1/auth/verify/` + userId);

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
        const host = `${state.URL}`;
        const URL = host + `/api/v1/discussion/classroom/${classRoomId}`;
        const response = await axios.get(URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${state.token}`,
          },
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
      const host = `${state.URL}`;
      const URL =
        host +
        `/api/v1/discussion/classroom/${classRoomId}/question/${questionId}`;

      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${state.token}`,
        },
      });

      dispatch({
        type: "AllANSWER_RQST_SUCCESS",
        payload: response.data.allAnswers,
      });
    } catch (error) {
      console.log("Get AllAnswers", error);
      dispatch({ type: "GET_RQST_ERROR" });
    }
  };

  async function login(email, password) {
    console.log(" Login req sent for  " + email + " with pass " + password);
    try {
      const res = await axios.post(`${state.URL}/api/v1/auth/login/`, {
        email,
        password,
      });

      if(res.data && res.data.person && res.data.person.isVerified)
      {
        dispatch({
          type: "LOGIN_USER",
          payload: res.data,
        });
      }else{
        dispatch({
          type: "LOGIN_ERROR",
          payload: 'Please verify your email before using website'
        });
      }
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
      const res = await axios.post(`${state.URL}/api/v1/auth/signup/`, {
        email,
        password,
        isFaculty,
        name,
        profile_pic: "",
      });
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
      // console.log(`${state.URL}/api/v1/account/${state.person._id}`)
      const res = await axios.put(
        `${state.URL}/api/v1/account/${state.person._id}`,
        {
          email: state.person.email,
          name: state.person.name,
          classcode: classcode,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${state.token}`,
          },
        }
      );
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
      const host = `${state.URL}`;
      const URL = host + `/api/v1/discussion/classroom/${classRoomId}`;
      question.authorId = state.person._id;
      console.log(question);
      console.log(URL);

      const response = await axios.post(URL, question, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${state.token}`,
        },
      });

      // var oldobj = state.allQuestionOfClassRoom
      // oldobj.push(question)
      // console.log(response.data.insertQuestion.insertedId);
      question._id = response.data.insertQuestion.insertedId;
      var newArray = state.allQuestionOfClassRoom;
      newArray.push(question);
      dispatch({
        type: "AddingNewQuestion_RQST_SUCCESS",
        payload: newArray,
      });
    } catch (error) {
      console.log("Adding new Question failed", error);
      dispatch({ type: "GET_RQST_ERROR" });
    }
  };

  const addAnswer = async (questionId, classRoomId, answer) => {
    dispatch({
      type: "Add_Answer_RQST",
    });
    try {
      const host = `${state.URL}`;
      const URL =
        host +
        `/api/v1/discussion/classroom/${classRoomId}/question/${questionId}`;

      answer.authorId = state.person._id;
      console.log(answer);
      console.log(URL);

      const response = await axios.post(URL, answer, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${state.token}`,
        },
      });

      console.log(response);

      answer._id = response.data.insertAnswer.insertedId;
      var newArray = state.allAnswerOfQuestion;
      newArray.push(answer);
      dispatch({
        type: "AddingNewAnswer_RQST_SUCCESS",
        payload: newArray,
      });
    } catch (error) {
      console.log("Adding new Answer failed", error);
      dispatch({ type: "GET_RQST_ERROR" });
    }
  };

  async function getSolutionsOfAssignment(assignmentId) {
    console.log(" get solns ");
    try {
      // console.log(`${state.URL}/api/v1/account/${state.person._id}`)
      const res = await axios.get(
        `${state.URL}/api/v1/solution/assignment/${assignmentId}`
      );
      console.log(res);
      var ans = [];
      if (res.data.solutions.length > 0) ans = res.data.solutions;
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
      // console.log(`${state.URL}/api/v1/account/${state.person._id}`)
      const res = await axios.put(`${state.URL}/api/v1/solution`, {
        solution: {
          _id: solutionId,
          marks: Number(marks),
        },
      });
      console.log(res);
      var newArray = state.solutionsOfAssignment.map((sol) => {
        if (sol._id === solutionId) {
          return res.data.updatedSolution;
        } else return sol;
      });
      console.log(newArray);
      dispatch({
        type: "ASSIGN_MARKS",
        payload: newArray,
      });
    } catch (err) {
      dispatch({
        type: "ASSIGN_ERROR",
        payload: err.response,
      });
    }
  }

  async function deleteQuestion(studentId, authorId, _id, classRoomId) {
    console.log("Deleting question");

    try {
      const question = {
        studentId,
        authorId,
        _id,
      };
      console.log(question);
      // console.log(`${state.URL}/api/v1/account/${state.person._id}`)
      const res = await axios.delete(
        `${state.URL}/api/v1/discussion/classroom/${classRoomId}`,
        { data: { question } }
      );

      dispatch({
        type: "DeleteQuestion_Success",
      });
    } catch (err) {
      dispatch({
        type: "DeleteQuestion_ERROR",
        payload: err.response,
      });
    }
    // studentId, authorId, _id
  }

  async function deleteAnswer(
    studentId,
    authorId,
    _id,
    questionId,
    classRoomId
  ) {
    console.log("Deleting answer");

    try {
      const answer = {
        studentId,
        authorId,
        _id,
      };
      console.log(answer);
      // console.log(`${state.URL}/api/v1/account/${state.person._id}`)
      const res = await axios.delete(
        `${state.URL}/api/v1/discussion/classroom/${classRoomId}/question/${questionId}`,
        { data: { answer } }
      );

      dispatch({
        type: "DeleteQuestion_Success",
      });
    } catch (err) {
      dispatch({
        type: "DeleteQuestion_ERROR",
        payload: err.response,
      });
    }

    // /classroom/:classRoomId/question/:questionId
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
        token: state.token,
        solutionsOfAssignment: state.solutionsOfAssignment,
        message: state.message,
        URL: state.URL,
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
        assignMarks,
        addAnswer,
        postStatus: state.postStatus,
        deleteAnswer,
        deleteQuestion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
