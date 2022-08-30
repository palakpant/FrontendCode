import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth_service";
import './css/Register.css';
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if ( value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be less than 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be less than 20 characters.
      </div>
    );
  }
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [empID, setEmpID] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeEmpID = (e) => {
    const empID = e.target.value;
    setEmpID(empID);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePhone = (e) => {
    const phone = e.target.value;
    setPhone(phone);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(empID, email, phone, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div className="main-register">
      <div className="register-contain">
      
        
        <Form onSubmit={handleRegister} ref={form} className="ui form register">
          {!successful && (
           
           <div className="innerContainer">

            
            <div className="usericon"> 
            <i className="huge user circle icon user"></i>
            </div>
              <div className="field">
                
                <Input
                  type="text"
                  placeholder="Employee ID"
                  name="empID"
                  value={empID}
                  onChange={onChangeEmpID}
                  validations={[required, vusername]}
                />
                </div>
             
              <div className="field">
                
                <Input
                  type="email"
                  placeholder="Employee Mail"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="field">
               
                <Input
                  type="text" 
                  name="phone" 
                  placeholder="Employee Phone"
                  value={phone}
                  onChange={onChangePhone}
                  validations={[required]}
                />
              </div>
              <div className="field">
               
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="field">
                <button className="ui black button">Sign Up</button>
              </div>

              </div>
             
           
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
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
export default Register;