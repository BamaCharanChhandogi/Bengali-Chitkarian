import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLogging : false,
    user: null,
};

export const userSlice = createSlice({
    name : 'user',
    initialState: initialState,

    reducers:{
        login : (state,action) => {
            state.isLogging = true;
            state.user = action.payload;
        },
        logout : (state) => {
            state.isLogging = false;
            state.user = null;
        }
    },
});

export const {login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;