import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth_service";

import './css/Login.css';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeEmpID = (e) => {
    const empID = e.target.value;
    setEmpID(empID);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
     AuthService.login(empID, password).then(
        (response) => {
          console.log("success");
          console.log(response);
          navigate("/profile");
           window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  
  
  return (

    <div className="main-login">
      <div className="login-contain">
      
        <Form onSubmit={handleLogin} ref={form} className="ui form login">
        <div className="usericon"> 
      <i className="huge user circle icon user"></i>
        </div>
          <div className="field">
            
            <Input
              type="text" 
              name="empId" 
              placeholder="Employee ID"
              value={empID}
              onChange={onChangeEmpID}
              validations={[required]}
            />
          </div>
          <div className="field">
            
            <Input
              type="password" 
              name="password" 
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
         
            <button className="ui black button" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          
          {message && (
            <div className="field">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Login;