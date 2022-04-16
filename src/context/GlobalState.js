import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'
//Initial State

const initialState = {
    classrooms: [],
    error: null,
    assignment:{},
    loading: true,
    name: '',
    email: '',
    isLoggedIn: true
}

//Create Context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    async function getClassrooms() {
        if (state.isLoggedIn) {
            const email = state.email;
            try {
              // dummy api
                const res = await axios.get(`/api/v1/classrooms/${email}`, {
                    headers: { 'Content-Type': 'application/json' }
                });

                dispatch({
                    type: 'GET_CLASSROOMS',
                    payload: res.data.data
                });
            } catch (err) {
                dispatch({
                    type: 'GET_REQUEST_ERROR',
                    payload: err.response.data.error
                });
            }
        }
    }
    
    async function getAssignment(){
        const assignment_id = "625a9b289a6aa315c02e8791";
        if(state.isLoggedIn){
            dispatch({
                type : 'ASSIGNMENT_RQST',
            })
            try{
                const response = await axios.get(`/api/v1/assignment/${assignment_id}`)
                console.log('get assignment',response.data);
                dispatch({
                    type : 'ASSIGNMENT_RQST_SUCCESS',
                    payload : response.data
                })
            }catch(error){
                console.log('get assignment',error)
                dispatch({
                    type : 'ASSIGNMENT_RQST_ERROR',
                    payload : error
                })
            }
        }
    }
 
    function userLogout() {
        dispatch({
            type: 'USER_LOGOUT'
        })
    }
    async function userLogin(data) {
        dispatch({
            type: 'USER_LOGIN',
            payload: data
        })
        const email = data.email;
        try {
            const res = await axios.get(`api/v1/transactions/${email}`);

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    
    return (<GlobalContext.Provider value={{
        classrooms: state.classrooms,
        error: state.error,
        loading: state.loading,
        name: state.name,
        assignment : state.assignment,
        email: state.email,
        isLoggedIn: state.isLoggedIn,
        getClassrooms,
        userLogin,
        getAssignment,
        userLogout
    }}>
        {children}
    </GlobalContext.Provider>)

}