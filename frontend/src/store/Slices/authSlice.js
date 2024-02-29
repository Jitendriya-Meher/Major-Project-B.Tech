import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username:"",
  email:"",
  address:"",
  phone:"",
  token:"",
  isLoggedin:false,
  loading:false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logInAuth: (state, action) => {
        const {username,email,token,address,phone} = action.payload;
        state.username = username;
        state.email = email;
        state.token = token;
        state.address = address;
        state.phone = phone;
        state.isLoggedin = true;
      },
      editAuth: (state, action) => {
        const {username,email} = action.payload;
        state.username = username;
        state.email = email;
      },
      logOutAuth:(state,action) => {
        state.isLoggedin = false;
        state.token = "";
        state.username = "";
        state.email = "";
      },
      setLoading:(state,action) => {
        state.loading = action.payload;
      }
    },
})
  
// Action creators are generated for each case reducer function
export const { logInAuth, editAuth, logOutAuth, setLoading } = authSlice.actions
  
export default authSlice.reducer