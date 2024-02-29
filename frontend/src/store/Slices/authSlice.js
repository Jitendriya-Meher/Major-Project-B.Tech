import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username:"",
  email:"",
  address:"",
  phone:"",
  token:"",
  isLoggedin:false,
  loading:false,
  isAdmin:false,
  baseURL: "http://localhost:4000"
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logInAuth: (state, action) => {
        const {username,email,token,address,phone,isAdmin} = action.payload;
        state.username = username;
        state.email = email;
        state.token = token;
        state.address = address;
        state.phone = phone;
        state.isAdmin = isAdmin;
        state.isLoggedin = true;
      },
      editAuth: (state, action) => {
        const {username,email,phone,address} = action.payload;
        state.username = username;
        state.email = email;
        state.address = address;
        state.phone = phone;
      },
      logOutAuth:(state,action) => {
        state.isLoggedin = false;
        state.token = "";
        state.username = "";
        state.email = "";
        state.address = "";
        state.phone = "";
      },
      setLoading:(state,action) => {
        state.loading = action.payload;
      }
    },
})
  
// Action creators are generated for each case reducer function
export const { logInAuth, editAuth, logOutAuth, setLoading } = authSlice.actions
  
export default authSlice.reducer