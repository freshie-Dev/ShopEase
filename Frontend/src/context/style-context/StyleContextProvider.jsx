import { createContext, useContext, useEffect, useState } from "react";

const StyleContext = createContext();

const StyleProvider = ({ children }) => {
  //! Register Form Styling
  const [selectedUserType, setSelectedUserType] = useState("");
  const [formType, setFormType] = useState(true);
  const animateUserTypeInput = (userType) => {
    if (userType === "buyer") {
      setSelectedUserType(userType);
    } else if (userType === "seller") {
      setSelectedUserType(userType);
    } else {
      setSelectedUserType("");
    }
  };
  const changeFormType = () => {
    setFormType(!formType);
  };

//! Seller Sidebar
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
  setOpenSidebarToggle(!openSidebarToggle)
}
//!------------------------------------------



  //! --------------------------------------------------

  //! Navbar Styling
  const [mobileNav, setMobileNav] = useState(false);
  const handleMobileNav = () => setMobileNav(!mobileNav);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    const newWindowWidth = window.innerWidth;
    setWindowWidth(newWindowWidth);
  };

  useEffect(() => {
    // Set initial window width and mobileNav
    setWindowWidth(window.innerWidth);
    if (windowWidth > 768) {
      if (mobileNav) setMobileNav(false);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);
  //! --------------------------------------------------

  //! Modal Styling
  const [changeField, setChangeField] = useState('');
  const [openModal, setOpenModal] = useState(false);

  return (
    <StyleContext.Provider
      value={{
        //! Register Form Styling
        selectedUserType,
        setSelectedUserType,
        formType,
        setFormType,
        animateUserTypeInput,
        changeFormType,
        //! Navbar Styling
        mobileNav,
        setMobileNav,
        handleMobileNav,
        //! Modal Styling
        openModal, setOpenModal,
        changeField, setChangeField,
        openSidebarToggle, setOpenSidebarToggle, OpenSidebar
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};
// CUSTOM HOOK FOR USING USER CONTEXT
const useStyleContext = () => {
  return useContext(StyleContext);
};

export default StyleProvider;
export { useStyleContext };
