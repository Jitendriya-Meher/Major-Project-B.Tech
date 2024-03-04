import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: localStorage.getItem("username") || "",
  email: localStorage.getItem("email") || "",
  token: localStorage.getItem("token") || "",
  isLoggedin: localStorage.getItem("isLoggedin") == "true",
  address: localStorage.getItem("address") || "",
  phone: localStorage.getItem("phone") || "",
  loading:false,
  isAdmin:  localStorage.getItem("isAdmin") == "true",
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

        localStorage.setItem("username",username);
        localStorage.setItem("email",email);
        localStorage.setItem("token",token);
        localStorage.setItem("isLoggedin",true);
        localStorage.setItem("isAdmin",isAdmin);
        localStorage.setItem("address",address);
        localStorage.setItem("phone",phone);
      },
      editAuth: (state, action) => {
        const {username,email,phone,address} = action.payload;
        state.username = username;
        state.email = email;
        state.address = address;
        state.phone = phone;

        localStorage.setItem("username",username);
        localStorage.setItem("email",email);
        localStorage.setItem("address",address);
        localStorage.setItem("phone",phone);
      },
      logOutAuth:(state,action) => {
        state.isLoggedin = false;
        state.isAdmin = false;
        state.token = "";
        state.username = "";
        state.email = "";
        state.address = "";
        state.phone = "";

        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedin");
        localStorage.removeItem("address");
        localStorage.removeItem("phone");
      },
      setLoading:(state,action) => {
        state.loading = action.payload;
      }
    },
})
  
// Action creators are generated for each case reducer function
export const { logInAuth, editAuth, logOutAuth, setLoading } = authSlice.actions
  
export default authSlice.reducer