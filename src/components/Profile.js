import React from "react";
import AuthService from "../services/auth_service";
import './css/Profile.css';
import Locations from './images/locationsimage.png';
import UserService from "../services/user_service";
import Desks from './images/deskspic.jpeg';
const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  // console.log(currentUser);






  return (
    <div className="container main-container">
    <div className="container user-container">
      
        
       <div className="user-css">
        <i style={{color:' beige'}} className="user circle outline icon massive profile-icon user-css"></i>
        </div>
       
        <div className="user-content">
        <div className="user-sub-content">
         
        <strong>Employee ID:</strong> {currentUser.empID}
       
       
       
        </div>
        <div className="user-sub-content">
        <strong>Email:</strong> {currentUser.email}
       
        </div>
       
        </div>

       

       
      
      </div>
      
      
      <div className="container details-container">

      <div className="container details-sub-container">
  <div className="row">
    <div className="col-sm first-card">

    <div className="card border-warning mb-3 card-css" style={{width: '23rem',height:'25rem'}}>
  <img className="card-img-top" src={Desks} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Book a seat</h5>
    <p className="card-text">Create a Booking!</p>
    <a href="/user" className="btn btn-warning">Book</a>
  </div>
</div>

    </div>
    <div className="col-sm second-card ">
    <div className="card border-warning mb-3 card-css" style={{width: '23rem',height:'25rem'}}>
  <img className="card-img-top" src={Desks} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">Cancel a seat</h5>
    <p className="card-text">Cancel a booking</p>
    <a href="/cancel" className="btn btn-warning">Cancel</a>
  </div>
</div>
    </div>
  
   
  </div>
</div>

     
      </div>

      
    </div>
  );
};

export default Profile;