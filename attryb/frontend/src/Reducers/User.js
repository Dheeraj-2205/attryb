import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false
};

export const userReducer = createReducer(initialState,{
    LoginRequest : (state,action) =>{
        state.loading = true
    },
    LoginSuccess : (state,action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true
    },
    LoginFailure : (state,action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false   
    },

    clearError : (state) =>{
        state.error = null;
    }
})