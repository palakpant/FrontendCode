import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/test/";
const BOOK_URL="http://localhost:8080/api/test/user/book/";
const LOC_URL="http://localhost:8080/api/test/user/seatleftbydateslot/";
const CODE_URL= "http://localhost:8080/api/test/user/availableoffice/";
const CANCEL_URL="http://localhost:8080/api/test/user/";

const MAIN_URL="http://localhost:8080/api/test/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
const getAvailableSlotDetail = async (dateOfTransaction="2022-08-29",slotTime,code) =>{
  //return axios.get(API_URL + "user", { headers: authHeader() });
  
  return await axios.post(LOC_URL + code , {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })
  
};

const getLocationData =(date,place, slot)=>{
  const formatYmd = date.toISOString().split('T')[0]
  return axios.get(CODE_URL + place +"?", {
    params: {
      date: formatYmd,
      slot:slot
    },
    
      headers:  authHeader() 
    
    });
};

const getBooking=(dateOfTransaction,slotTime,code)=>{
  dateOfTransaction = dateOfTransaction.toISOString().split('T')[0];
  return axios.post(BOOK_URL + code , {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })

}

const cancelBooking =(dateOfTransaction,slotTime) =>{
  dateOfTransaction = dateOfTransaction.toISOString().split('T')[0];
  return axios.post(MAIN_URL+ "cancel", {
    dateOfTransaction,
    slotTime
  },{
    headers: authHeader()
  })

}
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getAvailableSlotDetail,
  getLocationData,
  getBooking,
  cancelBooking,
  getAdminBoard
  
};
export default UserService;