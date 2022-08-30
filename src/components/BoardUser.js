import React, { useState, useEffect } from "react";
import UserService from "../services/user_service";
import SearchBar from "./SearchBarUp";


const BoardUser = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
   <div>
    <SearchBar/>
     
   </div>
     
  
  );
};
export default BoardUser;