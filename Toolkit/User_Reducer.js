import { createSlice } from '@reduxjs/toolkit'

let UserSlice = createSlice({
    name : 'user',
    initialState : {
        profile : JSON.parse(localStorage.getItem("pic")) || null,
        id : JSON.parse(localStorage.getItem("id")) || null,
        username : JSON.parse(localStorage.getItem("username")) || null
    },
    reducers : {
        LOGIN : (state,action) => {
            state.profile = action.payload.profile;
            state.id = action.payload.id
            state.username = action.payload.username
            localStorage.setItem("pic", JSON.stringify(action.payload.profile))
            localStorage.setItem("id", JSON.stringify(action.payload.id))
            localStorage.setItem("username", JSON.stringify(action.payload.username));
        },
        LOGOUT : (state,action) => {
            localStorage.clear();
            state.profile = ''
            state.id = ''
            state.username = ''
        }
    }
})
export let { LOGIN,LOGOUT } = UserSlice.actions;
export default UserSlice.reducer;