// import { useUserContext } from "@/context/user-context/UserContextProvider";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SendUser = () => {
//   //! Custom context hooks
//   const { baseUrl, userState } = useUserContext();

//   //! State Variables
//   const [auth, setAuth] = useState(null);

//   const navigate = useNavigate();
//   //! Verifying Token
//   const checkToken = async () => {
//     const userType = localStorage.getItem("userinfo")
//       ? JSON.parse(localStorage.getItem("userinfo")).usertype
//       : userState.loggedInUserInfo.usertype;
//     console.log("usertype from localstorage", userType);
//     let tokenStatus;
//     try {
//       const response = await axios.get(`${baseUrl}auth/verifytoken`, {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       });
//       tokenStatus = response.data.tokenStatus;
//       console.log(tokenStatus);
//     } catch (error) {
//       console.log(error);
//     }
//     if (tokenStatus) {
//       console.warn("1: token status TRUE running");
//       if (userType === "buyer") {
//         console.warn("1.1: token status TRUE and usertype BUYER running");
//         setAuth({
//           token: tokenStatus,
//           userType: "buyer",
//         });
//       } else {
//         console.warn("1.2: token status TRUE and usertype SELLER running");
//         setAuth({
//           token: tokenStatus,
//           userType: "seller",
//         });
//       }
//     } else {
//       console.warn("2: token status FALSE running");

//       setAuth({
//         token: tokenStatus,
//         userType: null,
//       });
//     }

//     console.log(auth);

    
//   };
//   useEffect(() => {
//     checkToken();
//   }, []);
//   useEffect(()=> {
//     if (auth.token && auth.userType === "buyer") {
//       navigate("/buyer/home");
//     } else if (auth.token && auth.userType === "seller") {
//       navigate("/seller/dashboard/home");
//     }
//   }, [auth])
//   return (
//     <>
//       <h1 className="text-7xl text-pink-300">hello</h1>
//     </>
//   );
// };

// export default SendUser;
