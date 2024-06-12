// import Sidebar from "@/components/seller/dashboard/sidebar/Sidebar";
// import SidebarSlide from "@/components/seller/dashboard/sidebar/SidebarSlide";
// import SidebarSlideToggle from "@/components/seller/dashboard/sidebar/SidebarSlideToggle";
// import { Outlet, Navigate } from "react-router-dom";

// const SellerRoutes = ({ auth }) => {
//   return auth.token && auth.userType === "seller" ? (

//       <div className='flex w-full min-h-screen relative '>
//         {/* <Navbar/> */}
//         < Sidebar/>
//         < SidebarSlideToggle/>
//         < SidebarSlide/>
//         <Outlet/>
//         {/* <Footer/> */}
//     </div>
//   ) : (
//     <Navigate to="/register" />
//   );
// };

// export default SellerRoutes;

import Sidebar from "@/components/seller/dashboard/sidebar/Sidebar";
import SidebarSlide from "@/components/seller/dashboard/sidebar/SidebarSlide";
import SidebarSlideToggle from "@/components/seller/dashboard/sidebar/SidebarSlideToggle";
import { useUserContext } from "@/context/user-context/UserContextProvider";
import { Outlet, Navigate } from "react-router-dom";

const SellerRoutes = () => {
  const { loggedInUserInfo } = useUserContext();
  const userType = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")).usertype :  loggedInUserInfo ? loggedInUserInfo.usertype === "seller" : null;
  console.log("Printing user type from seller routes", userType)
  return userType ? (
    <div className="flex w-full min-h-screen relative ">
      {/* <Navbar/> */}
      <Sidebar />
      <SidebarSlideToggle />
      <SidebarSlide />
      <Outlet />
      {/* <Footer/> */}
    </div>
  ) : (
    <Navigate to="/sadfasf" />
  );
};

export default SellerRoutes;
