import axios from "axios";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
// const API_URLL = "http://localhost:8080/";

const API_URL = "http://localhost:8080/api/auth/";
const register = (empID, email, phone, password) => {
  return axios.post(API_URL + "signup", {
    empID,
    email,
    phone,
    password,
  });
};

// const logi = (username, password) => {
//   return axios
//     .post(API_URLL + "tokenRequest", {
//       username,
//       password,
//     })
//     .then((response) => {
//       console.log(response);
      
//       return response;
//     });
// };
// const loginUser=(token)=>{
//   localStorage.setItem("token", token);
//   return true;

// }


const login = (empID, password) => {
  return axios
    .post(API_URL + "signin", {
      empID,
      password,
    })
    .then((response) => {
      console.log(response);
      if (response.data.empID) {
       
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
  return true;
};
const getCurrentUser = () => {
  // let tokenStr=localStorage.getItem("token");
  // if(tokenStr=undefined || tokenStr==' ' || tokenStr==null)
  // {
  //   return false;
  // }else{
  //   return true;
  // }
   return JSON.parse(localStorage.getItem("user"));
  
};

// const getToken=()=>{
//   return localStorage.getItem('token');
// }
const setUser=(user)=>{
  localStorage.setItem('user',JSON.stringify(user));
}

// const getUser=()=>{
//   let userstr=localStorage.getItem("user");
//   if(userstr!=null){
//     return JSON.parse(userstr);
//   }
//   else{
//     this.logout();
//     return null;
//   }
// }

//get User role
const getUserRole=()=>{
  let user=this.getUser();
  return user.authorities[0].authority;
}
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;