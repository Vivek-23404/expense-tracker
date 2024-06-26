import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser : null,
  loading : false,
  error : false
}


const authSclice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    loginStart(state){
      state.loading = true
    },
    loginSuccess(state,action){
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    loginFailure(state,action){
      state.loading = false
      state.error = action.payload
    },
    updateUserStart(state){
      state.loading = true
    },
    updateUserSuccess(state,action){
      state.currentUser = action.payload
      state.loading = false
      state.error = false
    },
    updateUserFailuer(state,action){
      state.loading = false
      state.error = action.payload
    },
    deleteUserStart(state){
      state.loading = true
    },
    deleteUserSuccess(state){
      state.currentUser = null
      state.loading = false
      state.error = false
    },
    deleteUserFailuer(state,action){
      state.loading = false
      state.error = action.payload
    },
    logOutUser(state){
      state.currentUser = null
      state.error = false
      state.loading = false
    }
  }
})

export const {
    loginStart, loginSuccess,loginFailure , 
    updateUserStart,updateUserSuccess,updateUserFailuer,
    deleteUserStart, deleteUserSuccess,deleteUserFailuer,
    logOutUser
  } = authSclice.actions

export default authSclice.reducer