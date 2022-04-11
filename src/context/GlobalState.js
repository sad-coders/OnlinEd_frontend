import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'
import axios from 'axios'
//Initial State

const initialState = {
    classrooms: [],
    error: null,
    loading: true,
    name: '',
    email: '',
    isLoggedIn: false
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
                const res = await axios.get(`api/v1/classrooms/${email}`, {
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
        email: state.email,
        isLoggedIn: state.isLoggedIn,
        getClassrooms,
        userLogin,
        userLogout
    }}>
        {children}
    </GlobalContext.Provider>)

}