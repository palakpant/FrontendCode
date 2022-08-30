import React, { useState, useEffect } from "react";
import UserService from "../services/user_service";
import './css/Home.css';

const Home = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        console.log(response);
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container background">
      <header className="jumbotron header-css">
        <h3 className="css">{content}</h3>
       
        
      </header>
     <img className="home-page-picture" src={require('./images/IT-serviceDesk.png')} />

    </div>
  );
};
export default Home;