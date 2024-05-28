import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./context/user-context/UserContextProvider";

function App() {
  const navigate = useNavigate();
  const { baseUrl, userState } = useUserContext();
  const userType = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")).usertype : userState.loggedInUserInfo.usertype
  
  const tokenVerification = async () => {
    const config = {
      headers : {
        "token": localStorage.getItem("token")
      }
    }
    const response = await axios.get(`${baseUrl}auth/verifytoken`,config);
    const data = response.data;
    return data.tokenStatus;
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const tokenStatus = await tokenVerification();
        if (tokenStatus === false) {
          localStorage.clear();
          navigate("/register");
        } else {
          if (localStorage.length > 0) {
            if (userType === "seller") {
               navigate("/seller/dashboard/home");
            } else {
              navigate("/buyer/home");
            }
          }
        }
      } catch (error) {
        console.error("Error during token verification:", error);
        localStorage.clear();
        navigate("/register"); // Assume token is invalid in case of error
      }
    };
    checkToken();
  }, [userType, navigate]);

}

export default App;
